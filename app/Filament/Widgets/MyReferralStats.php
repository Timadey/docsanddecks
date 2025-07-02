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

        // Get all referrals tied to the squad member ID
        $totalReferrals = DlbRegistration::where('referred_by', $user->squadMember->id)->count();

        $paidCount = DlbRegistration::where('referred_by', $user->squadMember->id)
            ->whereHas('payment', function ($query) {
                $query->where('status', 'success');
            })
            ->count();
        $totalEarnings = $paidCount * (0.2 * 7000);
        $formattedEarning = '₦' . number_format($totalEarnings);

        return [
            Stat::make('Total Earnings', $formattedEarning)
                ->icon('heroicon-o-banknotes')
                ->color('primary')
                ->description($formattedEarning . ' earned so far'),
            Stat::make('Total Referrals', $totalReferrals)
                ->icon('heroicon-o-user-group')
                ->color('info')
                ->description('All users you have referred'),
            Stat::make('Paid Referrals', $paidCount)
                ->icon('heroicon-o-currency-dollar')
                ->color('success')
                ->description('Referrals with successful payment'),
        ];
    }
}
