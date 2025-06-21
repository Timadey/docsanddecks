<?php

namespace App\Modules\DLBRegistration;

use App\Http\Controllers\Controller;
use App\Mail\PaymentSuccessMail;
use App\Mail\RegistrationSuccessMail;
use App\Models\User;
use App\Modules\SquadMember\SquadMember;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class DLBRegistrationController extends Controller
{
    protected GSheetService $gsheet;

    public function __construct(GSheetService $gsheet)
    {
        $this->gsheet = $gsheet;
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'firstname'      => 'required|string|max:255',
            'lastname'       => 'required|string|max:255',
            'middlename'     => 'nullable|string|max:255',
            'gender'         => 'required|string|in:male,female',
            'email'          => 'required|email:dns,rfc,spoof|max:255|unique:users,email',
            'phone'          => 'required|string|max:15|unique:users,phone',
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
        $user->dlbRegistration()->create($validated);
        $email = $user->email;

        try{
            // Send registration success email
            logger()->info("Sending registration success email", ['to' => $email]);
            Mail::to($email)->send(new RegistrationSuccessMail($user));
        }catch (\Exception $e){
            logger()->error("Failed to send registration email", [$e->getMessage()]);
        }

        return redirect()->route('payment', ['email' => $user->email])
            ->with('success', 'Registration done successfully, proceed to payment.');
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
                ] ]);
        }
        return response()->json(['success'=> false,'error' => 'No participant found with that email.']);
    }

    // Validate referral code (for referral code check on payment page)
    public function validateReferral(Request $request)
    {
        $request->validate([
            'code' => 'required|string'
        ]);
        logger()->info("Validating referral code", ['code' => $request->input('code')]);
        $referral = SquadMember::where('referral_code', $request->input('code'))->first();

        if ($referral) {
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
               logger()->info("Looking up user for payment", ['customer_email' => $customerEmail]);
               $user = User::where('email', $customerEmail)->first();
               if ($user && $user->dlbRegistration) {
                   logger()->info("Creating payment record", ['user_id' => $user->id, 'payment_data' => $data]);
                   $payment = $user->dlbRegistration->payment()->create([
                       'user_id' => $user->id,
                       'reference' => $data['reference'],
                       'amount_charged' => $data['requested_amount'] / 100,
                       'amount_paid' => $data['amount'] / 100,
                       'currency' => $data['currency'],
                       'status' => strtolower($data['status']),
                       'payment_method' => $data['channel'],
                       'provider' => 'PAYSTACK',
                       'paid_at' => Carbon::parse($data['paid_at'])->toDateTimeString(),
                   ]);
                    try{
                        // Send payment success email
                        logger()->info("Sending payment success email", ['to' => $customerEmail]);
                        Mail::to($customerEmail)->send(new PaymentSuccessMail($user, $payment));
                    }catch (\Exception $e){
                        logger()->error("Failed to send payment success email", [$e->getMessage()]);
                    }
               }
           }
       }
       return response($response->body(), 200)
           ->header('Content-Type', 'application/json');
    }

}
