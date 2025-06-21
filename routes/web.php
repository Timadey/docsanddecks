<?php

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
    return Inertia::render('register-dlb');
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


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/../app/Modules/DLBRegistration/dlb_routes.php';

//require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
