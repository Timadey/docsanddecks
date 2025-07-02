<?php

namespace App\Filament\Resources\MyReferralResource\Pages;

use App\Filament\Resources\MyReferralResource;
use Filament\Resources\Pages\ListRecords;

class ListMyReferrals extends ListRecords
{
    protected static string $resource = MyReferralResource::class;

    protected static ?string $title = 'My Referrals';

    protected function getHeaderActions(): array
    {
        return [
            // No actions needed for referrals list
        ];
    }
}
