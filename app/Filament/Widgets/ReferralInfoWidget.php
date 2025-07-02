<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class ReferralInfoWidget extends Widget
{
    protected static string $view = 'filament.widgets.referral-info-widget';

    protected static ?int $sort = -1;

    protected int | string | array $columnSpan = 'full';

    public function getReferralCode(): string
    {
        return auth()->user()->squadMember->referral_code ?? '';
    }

    public function getRegistrationUrl(): string
    {
        $code = $this->getReferralCode();
        return route('register-dlb', ['discount' => $code]);
    }
}
