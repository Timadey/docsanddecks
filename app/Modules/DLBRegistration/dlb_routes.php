<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Modules\DLBRegistration\DLBRegistrationController;

Route::post('submit-register-dlb', [DLBRegistrationController::class, 'register'])->name('submit-register-dlb');
