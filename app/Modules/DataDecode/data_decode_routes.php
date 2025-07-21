<?php

use App\Modules\DataDecode\DataDecodeController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::post('submit-register-dlb', [DataDecodeController::class, 'register'])->middleware(HandlePrecognitiveRequests::class)->name('submit-register-dlb');
Route::post('/api/payment/user-by-email', [DataDecodeController::class, 'getUserByEmail']);
Route::post('/api/payment/validate-referral', [DataDecodeController::class, 'validateReferral']);
Route::get('/api/payment/validate-payment', [DataDecodeController::class, 'validatePayment']);

