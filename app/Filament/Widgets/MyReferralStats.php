<?php

namespace App\Filament\Widgets;

use App\Modules\DLBRegistration\DlbRegistration;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class MyReferralStats extends BaseWidget
{
    protected function getStats(): array
    {
        $user = auth()->user();

        // Get all referrals tied to the squad member's referral code
        $totalReferrals = DlbRegistration::where('referral', $user->squadMember->referral_code)->count();

        $paidCount = DlbRegistration::where('referral', $user->squadMember->referral_code)
            ->whereHas('payment', function ($query) {
                $query->where('status', 'success');
            })
            ->count();

        return [
            Stat::make('Total Referrals', $totalReferrals),
            Stat::make('Paid Referrals', $paidCount),
        ];
    }
}
