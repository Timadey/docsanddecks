<?php

namespace App\Modules\DataDecode;

use App\Http\Controllers\Controller;
use App\Mail\DataDecodeRegistrationSuccessMail;
use App\Mail\RegistrationSuccessMail;
use App\Models\User;
use App\Modules\DataDecode\DataDecodeRegistration;
use App\Modules\Payment\PaymentService;
use App\Modules\SquadMember\SquadMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class DataDecodeController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'firstname'      => 'required|string|max:255',
            'lastname'       => 'required|string|max:255',
            'middlename'     => 'nullable|string|max:255',
            'gender'         => 'required|string|in:male,female',
            'email'          => 'required|email|max:255',
            'phone'          => 'required|string|max:18',
            'motivation'     => 'required|string|max:1000',
            'hear_source'    => 'required|string|max:100',
            'will_commit'    => 'required|boolean',
            'department'     => 'required|string|max:255',
            'institution'     => 'required|string|max:255',
            'level'          => 'required|string|in:100,200,300,400,500,600,700,PG',
            'project_topic'   => 'nullable|string|max:255',
        ]);
        logger()->info("New data decode user submit registration", ['data' => $request->all(), 'ip' => $request->ip()]);

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
        logger()->info("Creating DataDecode registration for user", ['user_id' => $user->id, 'validated' => $validated]);

        $registrationData = $validated;
        $user->dataDecodeRegistration()->create($registrationData);
        $email = $user->email;

        try{
            // Send registration success email
            logger()->info("Sending registration success email", ['to' => $email]);
            Mail::to($email)->send(new DataDecodeRegistrationSuccessMail($user));
        }catch (\Exception $e){
            logger()->error("Failed to send registration email", [$e->getMessage()]);
        }
        $ip = request()->header('CF-Connecting-IP') ?? request()->ip();
        // Get user's country and currency
        $this->updateUserLocation($user, $ip);
        return redirect()->back()->with('success', 'Registration successful');
    }

    public function updateUserLocation(User $user, string $ip)
    {
        logger()->info("Updating user location", ['email' => $user->email]);
        // Get user's country and currency
        $location = Http::get("https://ipapi.co/{$ip}/json/")->json();
        if (isset($location['error']) || !isset($location['country']) || !isset($location['currency'])) {
            logger()->warning("Could not fetch location data for IP: {$ip}", ['response' => $location]);
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'location' => json_encode(['ip' => $ip ]),
                ]
            );
            return $user;
        }
        logger()->info("Fetched location data", ['location' => $location]);
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'location' => json_encode($location),
            ]
        );
        return response()->json(['success' => true, 'message' => 'Location updated successfully.', 'data' => $location ]);
    }
}
