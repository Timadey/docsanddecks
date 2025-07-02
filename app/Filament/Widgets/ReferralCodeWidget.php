<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ReferralCodeWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $user = auth()->user();
        
        if (!$user || !$user->squadMember) {
            return [];
        }

        $referralCode = $user->squadMember->referral_code;
        $registrationUrl = config('app.url') . '/register?ref=' . $referralCode;

        return [
            Stat::make('Your Referral Code', $referralCode)
                ->description('Click to copy • Share this code to earn rewards')
                ->descriptionIcon('heroicon-m-clipboard-document')
                ->icon('heroicon-m-qr-code')
                ->color('success')
                ->url('#')
                ->extraAttributes([
                    'wire:click' => "\$dispatch('copy-to-clipboard', { text: '{$referralCode}' })",
                    'class' => 'cursor-pointer hover:bg-green-50 transition-colors',
                    'title' => 'Click to copy your referral code',
                ]),
            
            Stat::make('Registration URL', 'Copy Link')
                ->description('Direct link with your referral code embedded')
                ->descriptionIcon('heroicon-m-link')
                ->icon('heroicon-m-share')
                ->color('primary')
                ->url('#')
                ->extraAttributes([
                    'wire:click' => "\$dispatch('copy-to-clipboard', { text: '{$registrationUrl}' })",
                    'class' => 'cursor-pointer hover:bg-blue-50 transition-colors',
                    'title' => 'Click to copy registration link',
                ]),
        ];
    }

    protected static ?int $sort = -1; // Display this widget first
}
