<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('register-dlb', function () {
    return Inertia::render('register-dlb');
})->name('register-dlb');

Route::get('payment', function () {
    return Inertia::render('payment');
})->name('payment');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/../app/Modules/DLBRegistration/dlb_routes.php';

//require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
