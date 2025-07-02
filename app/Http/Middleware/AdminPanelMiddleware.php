<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminPanelMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Check if user is authenticated and has the specific email
        $adminEmails = explode(',', env('ADMIN_EMAILS', ''));
        if (!$user || !in_array($user->email, $adminEmails)) {
            abort(403, 'Access denied. You do not have permission to access the binoculars.');
        }

        return $next($request);
    }
}
