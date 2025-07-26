<?php

use App\Modules\DataDecode\DataDecodeController;
use App\Modules\DLBRegistration\DLBRegistrationController;
use App\Modules\SquadMember\SquadMember;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

//Route::get('/testmail', function () {
//    return view('emails.registration_success', [
//        'user' => (object)[
//            'firstname' => 'Jane Doe'
//        ],
//        'paymentLink' => route('payment', ['email' => 'dlktimothy@gmail.com']),
//        'whatsappGroupLink' => 'http://docs_and_decks.test',
//        // 'payment' => (object)[
//        //     'reference' => 'PAY123456789',
//        //     'amount_paid' => 250000,
//        //     'payment_method' => 'card',
//        //     'paid_at' => now(),
//        // ]
//    ]);
//})->name('testmail');

Route::get('register-dlb', function () {
    $refCode = request()->query('discount');
    $isValidRef = false;
    $referrerName = null;

    // Validate the referral code if provided
    if ($refCode) {
        $squadMember = SquadMember::whereRaw('LOWER(referral_code) = ?', [strtolower($refCode)])
            ->with('user')
            ->first();

        if ($squadMember) {
            $isValidRef = true;
            $referrerName = $squadMember->user->firstname . ' ' . $squadMember->user->lastname;
        }
    }

    return Inertia::render('register-dlb', [
        'pricing' => [
            'base_discounted' => 7000,
            'base_original' => 7000,
            'base_currency' => 'NGN',
        ],
        'referral' => [
            'code' => $refCode,
            'is_valid' => $isValidRef,
            'referrer_name' => $referrerName,
        ],
    ]);
})->name('register-dlb');


Route::get('payment', function () {
    return Inertia::render('payment');
})->name('payment');

Route::get('squad', function () {
    return Inertia::render('squad');
})->name('squad');

Route::get('privacy-policy', function () {
    return Inertia::render('privacy-policy');
})->name('privacy-policy');

Route::prefix('payment')->group(function () {
    Route::post('initialize-rave', [DLBRegistrationController::class, 'initializeRave'])->name('payment.rave');
    Route::get('confirm-rave', [DLBRegistrationController::class, 'confirmRave'])->name('payment.confirm-rave');
});


Route::get('register-dd', function () {
    return Inertia::render('register-data-decode');
})->name('register-data-decode');

Route::post('/data-decode/register', [DataDecodeController::class, 'register'])->name('data-decode.register');

Route::get('/data-decode/preview-email', function () {
    return new App\Mail\DataDecodeRegistrationSuccessMail(
        (object)[
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john.doe@example.com'
        ],
        'https://chat.whatsapp.com/LMUwvp2pNMXHAOmwHXSDcn'
    );
})->name('data-decode.preview-email');

Route::get('exchange-rate', function () {
    $cacheKey = 'exchange_rate_ngn';
    $cached = Cache::get($cacheKey);

    if ($cached) {
        return response()->json($cached);
    }

    $response = Http::get('https://v6.exchangerate-api.com/v6/b708622bd3a2c99942c4228f/latest/NGN');
    if ($response->successful()) {
        $data = $response->json();
        Cache::put($cacheKey, $data, now()->addHours(6));
        return response()->json($data);
    }

    return response()->json(['error' => 'Unable to fetch rates'], 500);
})->name('exchange-rate');

Route::get('/dlb/send-telegram-onboarding-emails', [DLBRegistrationController::class, 'sendTelegramOnboardingEmails'])->name('dlb.send-telegram-onboarding-emails');
Route::get('/dlb/preview-telegram-onboarding-email/paid', [DLBRegistrationController::class, 'previewTelegramOnboardingEmailPaid'])->name('dlb.preview-telegram-onboarding-email.paid');
Route::get('/dlb/preview-telegram-onboarding-email/unpaid', [DLBRegistrationController::class, 'previewTelegramOnboardingEmailUnpaid'])->name('dlb.preview-telegram-onboarding-email.unpaid');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/../app/Modules/DLBRegistration/dlb_routes.php';

//require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
