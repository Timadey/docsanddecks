<?php

use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use App\Modules\DLBRegistration\DLBRegistrationController;

Route::post('submit-register-dlb', [DLBRegistrationController::class, 'register'])->middleware(HandlePrecognitiveRequests::class)->name('submit-register-dlb');
Route::post('/api/payment/user-by-email', [DLBRegistrationController::class, 'getUserByEmail']);
Route::post('/api/payment/validate-referral', [DLBRegistrationController::class, 'validateReferral']);
Route::get('/api/payment/validate-payment', [DLBRegistrationController::class, 'validatePayment']);

