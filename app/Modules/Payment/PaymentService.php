<?php

namespace App\Modules\Payment;

use App\Mail\PaymentSuccessMail;
use App\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
class PaymentService
{
    /**
     * Makes payment using paystack
     */
    public function makePaystackPayment($data, $price, $redirect_url)
    {
        $payload = [
            'reference' => $data['reference'],
            'email'=> $data['email'],
            'amount' => $price,
            'currency' => $data['currency'],
            'callback_url' => $redirect_url,
            "metadata" => json_encode([
                'customer' => [
                    'email' => $data['email'],
                    'name' => $data['name'],
                ],
                "custom_fields" => [
                    [
                        'display_name' => 'Customer Name',
                        'variable_name' => 'Institution Name',
                        'value' => $data['name'],
                    ]
                ]
            ]),


        ];
        // Initiate payment
        $SECRET_KEY = env('PAYSTACK_SECRET_KEY');
        $response = Http::withToken($SECRET_KEY)
            ->post("https://api.paystack.co/transaction/initialize", $payload);

        $flw = $response->object();


        return $flw;

    }

    /**
     * Obtain Paystack payment information
     * @return void
     */
    public function confirmPaystackPayment(Request $request,  Closure $giveValueFunc)
    {
        $query = (object) $request->query();
        $trxref = $query->trxref ?? null;
        $reference = $query->reference  ?? null;

        if ($trxref == $reference){
            $SECRET_KEY = env('PAYSTACK_SECRET_KEY');
            $response = Http::withToken($SECRET_KEY)
                ->get("https://api.paystack.co/transaction/verify/$trxref");

            $flw = $response->object();

            if ($flw->status === true){
                $user = $flw->data->metadata->customer;
                return $giveValueFunc($user, $request);
            }
        }
        return Inertia::location(route('homepage'));
    }
    /**
     * Make a payment
     *
     * @future move this to a service
     */
    public function makePayment($data){
        $payload = [
            'tx_ref' => 'RAVEDLB' . time(),
            'amount' => $data['amount'],
            'currency' => $data['currency'],
            'redirect_url' => $data['redirect_url'],
            'payment_options' => "card, account, mobilemoneyghana, mobilemoneyfranco, mobilemoneyuganda, mobilemoneyrwanda, mobilemoneyzambia, opay, ussd, mpesa, banktransfer, googlepay, applepay",
            'customer' => [
                'email' => $data['email'],
                'name' => $data['name'],
            ],
            'customizations' => [
                'title' => config('app.name'),
                'logo' => asset('logo.svg')
            ],
        ];
        // Initiate payment
        $SECRET_KEY = config('services.rave.s_key');
        $response = Http::withToken($SECRET_KEY)
            ->post("https://api.flutterwave.com/v3/payments", $payload);

        return $response->object();

        // return Inertia::location($flw->data->link);
        // return redirect($flw->data->link);
    }

    /**
     * Confirm Payment and make booking
     */
    public function confirmPayment($transaction_id, $status, $tx_ref)
    {
        if ($transaction_id && $status && $tx_ref) {
            $SECRET_KEY = config('services.rave.s_key');
            $response = Http::withToken($SECRET_KEY)
                ->get("https://api.flutterwave.com/v3/transactions/$transaction_id/verify");

            $flw = $response->json();

            if ($flw['status'] === 'success'){
                return ['success' => true, 'data' => $flw['data']];
            }
        }
        return ['success' => false, 'message' => 'Payment could not be verified. Please try again later.'];
    }

    public function recordUserPayment($data, $customerEmail)
    {
        logger()->info("Looking up user for payment", ['customer_email' => $customerEmail]);
        $user = User::where('email', $customerEmail)->first();
        if ($user && $user->dlbRegistration) {
            logger()->info("Creating payment record", ['user_id' => $user->id, 'payment_data' => $data]);
            // we are only saving success payment so it is safe to just check for existing payment record
            if ($user->dlbRegistration->payment()->where('reference', $data['reference'])->exists()) {
                logger()->info("Payment record already exists for user", ['user_id' => $user->id, 'reference' => $data['reference']]);
                return; // Payment record already exists
            }
            $payment = $user->dlbRegistration->payment()->create([
                'user_id' => $user->id,
                'reference' => $data['reference'],
                'amount_charged' => $data['requested_amount'] / 100,
                'amount_paid' => $data['amount'] / 100,
                'currency' => $data['currency'],
                'status' => strtolower($data['status']),
                'payment_method' => $data['channel'],
                'provider' => $data['provider'],
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
