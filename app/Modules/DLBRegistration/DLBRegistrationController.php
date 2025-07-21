<?php

namespace App\Modules\DLBRegistration;

use App\Http\Controllers\Controller;
use App\Mail\RegistrationSuccessMail;
use App\Models\User;
use App\Modules\Payment\PaymentService;
use App\Modules\SquadMember\SquadMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

// @todo: i need to clean up teh whole of this application, this is just an mvp
class DLBRegistrationController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'firstname'      => 'required|string|max:255',
            'lastname'       => 'required|string|max:255',
            'middlename'     => 'nullable|string|max:255',
            'gender'         => 'required|string|in:male,female',
            'email'          => 'required|email:dns,rfc,spoof|max:255|unique:users,email',
            'phone'          => 'required|string|max:18|unique:users,phone',
            'age_group'      => 'required|string|max:50',
            'msword_level'   => 'required|string|max:50',
            'msexcel_level'  => 'required|string|max:50',
            'mspptx_level'   => 'required|string|max:50',
            'education'      => 'required|string|max:255',
            'occupation'     => 'required|string|max:255',
            'motivation'     => 'required|string|max:1000',
            'hear_source'    => 'required|string|max:100',
            'referral'       => [
                'nullable',
                'string',
                'max:100',
                function ($attribute, $value, $fail) {
                    if ($value && !SquadMember::whereRaw('LOWER(referral_code) = ?', [strtolower($value)])->exists()) {
                        $fail('The selected referral code is invalid.');
                    }
                },
            ],
            'will_commit'    => 'required|boolean',
        ]);
        logger()->info("New user submit registration", ['data' => $request->all(), 'ip' => $request->ip()]);

        $user = User::firstOrCreate(
            [
                'email' => $validated['email'],
            ],
            [
                'firstname' => $validated['firstname'],
                'lastname' => $validated['lastname'],
                'middlename' => $validated['middlename'] ?? null,
                'gender' => $validated['gender'],
                'phone' => $validated['phone'],
                'password' => bcrypt('password'),
            ]
        );
        logger()->info("User created or found", ['user' => $user->toArray()]);

        logger()->info("Creating DLB registration for user", ['user_id' => $user->id, 'validated' => $validated]);

        // Find squad member by referral code and set referred_by
        $referredBy = null;
        if (!empty($validated['referral'])) {
            $squadMember = SquadMember::whereRaw('LOWER(referral_code) = ?', [strtolower($validated['referral'])])->first();
            if ($squadMember) {
                $referredBy = $squadMember->id;
            }
        }

        $registrationData = $validated;
        $registrationData['referred_by'] = $referredBy;

        $user->dlbRegistration()->create($registrationData);
        $email = $user->email;

        try{
            // Send registration success email
            logger()->info("Sending registration success email", ['to' => $email]);
            Mail::to($email)->send(new RegistrationSuccessMail($user));
        }catch (\Exception $e){
            logger()->error("Failed to send registration email", [$e->getMessage()]);
        }
        $ip = request()->header('CF-Connecting-IP') ?? request()->ip();
        // Get user's country and currency
        $this->updateUserLocation($user, $ip);
        return redirect()->back()->with('success', 'Registration successful');
//        return response()->json([
//            'redirect' => 'https://chat.whatsapp.com/LMUwvp2pNMXHAOmwHXSDcn',
//        ]);

//        return redirect()->route('payment', ['email' => $user->email])
//            ->with('success', 'Registration done successfully, proceed to payment.');
    }

    public function updateUserLocation(User $user, string $ip)
    {
        logger()->info("Updating user location", ['email' => $user->email]);
        // Get user's country and currency
        $location = Http::get("https://ipapi.co/{$ip}/json/")->json();
        if (isset($location['error']) || !isset($location['country']) || !isset($location['currency'])) {
            logger()->warning("Could not fetch location data for IP: {$ip}", ['response' => $location]);
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'location' => json_encode(['ip' => $ip ]),
                ]
            );
            return $user;
        }
        logger()->info("Fetched location data", ['location' => $location]);
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'location' => json_encode($location),
            ]
        );
        return response()->json(['success' => true, 'message' => 'Location updated successfully.', 'data' => $location ]);
    }

    public function getUserByEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        logger()->info("Fetching user by email", ['email' => $request->input('email')]);
        $user = User::with(['dlbRegistration.referredBy'])->where('email', $request->input('email'))->first();
        if ($user && $user->dlbRegistration) {
            //dd($user);
            // Update location if not set
            if (!$user->profile || !$user->profile->location) {
                $ip = request()->header('CF-Connecting-IP') ?? request()->ip();
                $this->updateUserLocation($user, $ip);
                // Refresh user profile after update
                $user->refresh();
            }
            $payment = $user->dlbRegistration->payment;
            return response()->json([
                'success'=> true,
                'name' => $user->firstname,
                'user' => [
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'registration_id' => $user->dlbRegistration->id,
                    'payment_success' => $payment
                        && $payment->amount_charged == $payment->amount_paid
                        && $payment->status == 'success',
                ],
                'referral' => [
                    'code' => $user->dlbRegistration->referredBy?->referral_code,
                    'name' => $user->dlbRegistration->referredBy?->user->firstname,
                ]
            ]);
        }
        return response()->json(['success'=> false,'error' => 'No participant found with that email.']);
    }

    // Validate referral code (for referral code check on payment page)
    public function validateReferral(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'email' => 'required|email',
        ]);
        logger()->info("Validating referral code", ['code' => $request->input('code')]);
        $referral = SquadMember::where('referral_code', $request->input('code'))->first();

        if ($referral && $referral->user ) {
            // squad members can refer themselves
            if ($referral->user->email == $request->input('email')) {
                return response()->json([
                    'valid' => false,
                    'referrer' => '',
                    'message' => 'You can\'t refer yourself, lol, share the code with your friends instead.'
                ]);
            }

            // Check and update user's registration referral if empty
            $user = User::where('email', $request->input('email'))->first();
            if ($user && $user->dlbRegistration && empty($user->dlbRegistration->referral)) {
                $user->dlbRegistration->referral = $referral->referral_code;
                $user->dlbRegistration->referred_by = $referral->id;
                $user->dlbRegistration->save();
            }

            return response()->json([
                'valid' => true,
                'referrer' => $referral->user->firstname,
                'code' => $referral->referral_code,
            ]);
        }

        return response()->json([
            'valid' => false,
            'referrer' => ''
        ]);
    }

    public function validatePayment(Request $request)
    {
       $request->validate([
           'reference' => 'required|string',
       ]);

       $sKey = config('services.paystack.s_key');
       $reference = $request->reference;
       //dd($request->reference);
       $response = Http::withHeaders([
           'Authorization' => "Bearer {$sKey}",
           'Cache-Control' => 'no-cache',
       ])->get("https://api.paystack.co/transaction/verify/{$reference}");

       if ($response->failed()) {
           logger()->info("Could not validate payment for reference: {$reference}");
           logger()->debug($response->body());
           return response()->json(['success' => false, 'error' => $response->body()], 500);
       }
       $resp = $response->json();
       logger()->info("Valid payment for reference: {$reference}", [$resp]);
       if ($resp['status'] && isset($resp['data'])) {
           $data = $resp['data'];
           if ($data['status'] == 'success') {
               $customerEmail = $data['customer']['email'];
               $data['provider'] = 'PAYSTACK';
               $this->paymentService->recordUserPayment($data, $customerEmail);
           }
       }
       return response($response->body(), 200)
           ->header('Content-Type', 'application/json');
    }

    public function initializeRave(Request $request)
    {
        //@todo: i know this is not right, collecting amount from frontend, but this is a minimal application
        // worst case refund their money if they pay less than the required amount
        $request->validate([
            'email' => 'required|email',
            'amount' => 'required|numeric|min:1',
            'currency' => 'required|string|max:3',
        ]);

        logger()->info("Initializing Rave payment", [
            'email' => $request->input('email'),
            'amount' => $request->input('amount'),
            'currency' => $request->input('currency'),
        ]);

        $user = User::where('email', $request->input('email'))->firstorFail();
        $data = [
            'email' => $request->input('email'),
            'amount' => $request->input('amount'),
            'currency' => $request->input('currency'),
            'name' => "{$user->firstname }{$user->lastname}",
            'redirect_url' => route('payment.confirm-rave'),
        ];

        $paymentObject = $this->paymentService->makePayment($data);
        logger()->info("Rave payment initialized", [$paymentObject]);
        return response()->json([
            'success' => true,
            'payment_url' => $paymentObject->data->link,
            //'reference' => $paymentObject->data->reference,
        ]);
    }

    public function confirmRave(Request $request)
    {
        logger()->info("Confirming Rave payment", ['query' => $request->query()]);

        $query = (object) $request->query();
        $transaction_id = $query->transaction_id ?? null;
        $status = $query->status  ?? null;
        $tx_ref = $query->tx_ref  ?? null;
        $resp = $this->paymentService->confirmPayment($transaction_id, $status, $tx_ref);
        //dd($resp);
        if ($resp['success'] && isset($resp['data']) && $resp['data']['status'] == 'successful') {
            $data = $resp['data'];
            $data['provider'] = 'FLUTTERWAVE';
            $data['reference'] = $data['tx_ref'];
            $data['requested_amount'] = $data['charged_amount'];
            $data['amount_paid'] = $data['amount'];
            $data['channel'] = $data['payment_type'];
            $data['paid_at'] = $data['created_at'];
            $data['status'] = 'success';
            $customerEmail = $data['customer']['email'] ?? null;
            $this->paymentService->recordUserPayment($data, $customerEmail);
            return Inertia::render('payment-check', ['payment_success' => true]);
        }
        return Inertia::render('payment-check', ['payment_success' => false]);
    }
}
