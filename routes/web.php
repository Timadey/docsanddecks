<?php

use App\Modules\DLBRegistration\DLBRegistrationController;
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
    return Inertia::render('register-dlb', [
        'pricing' => [
            'base_discounted' => 5600,
            'base_original' => 7000,
            'base_currency' => 'NGN',
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/../app/Modules/DLBRegistration/dlb_routes.php';

//require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
