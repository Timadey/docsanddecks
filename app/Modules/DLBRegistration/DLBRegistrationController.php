<?php

namespace App\Modules\DLBRegistration;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

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
            'gender'         => 'required|string|in:male,female,other',
            'email'          => [
                'required',
                'email',
                'max:255',
                function ($attribute, $value, $fail) {
                    if ($this->gsheet->existsInGoogleSheet('email', $value, 'registration')) {
                        $fail('The email has already been registered.');
                    }
                },
            ],
            'phone'          => [
                'required',
                'string',
                'max:15',
                function ($attribute, $value, $fail) {
                    if ($this->gsheet->existsInGoogleSheet('phone', $value, 'registration')) {
                        $fail('The phone number has already been registered.');
                    }
                },
            ],
            'age_group'      => 'required|string|max:50',
            'msword_level'   => 'required|string|max:50',
            'msexcel_level'  => 'required|string|max:50',
            'mspptx_level'   => 'required|string|max:50',
            'education'      => 'required|string|max:255',
            'occupation'     => 'required|string|max:255',
            'motivation'     => 'required|string|max:1000',
            'hear_source'    => 'required|string|max:100',
            'referral'       => 'nullable|string|max:100',
            'will_commit'    => 'required|in:0,1',
        ]);

        $this->gsheet->appendToGoogleSheet($validated);

        return redirect()->route('payment', ['email' => $request->email])
            ->with('success', 'Registration done successfully, proceed to payment.');
    }
}
