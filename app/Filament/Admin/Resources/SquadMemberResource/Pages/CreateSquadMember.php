<?php

namespace App\Filament\Admin\Resources\SquadMemberResource\Pages;

use App\Filament\Admin\Resources\SquadMemberResource;
use App\Modules\SquadMember\SquadMember;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Str;

class CreateSquadMember extends CreateRecord
{
    protected static string $resource = SquadMemberResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Ensure referral code is unique
        if (empty($data['referral_code'])) {
            // Generate a unique referral code if not provided
            do {
                $data['referral_code'] = strtoupper(Str::random(8));
            } while (SquadMember::where('referral_code', $data['referral_code'])->exists());
        } else {
            // Validate and ensure uniqueness if provided
            $originalCode = $data['referral_code'];
            
            while (SquadMember::where('referral_code', $data['referral_code'])->exists()) {
                $data['referral_code'] = strtoupper(Str::random(8));
            }
            
            // Notify if code was changed
            if ($originalCode !== $data['referral_code']) {
                Notification::make()
                    ->title('Referral Code Updated')
                    ->body("Code was changed from {$originalCode} to {$data['referral_code']} due to conflicts.")
                    ->warning()
                    ->send();
            }
        }

        return $data;
    }

    protected function afterCreate(): void
    {
        Notification::make()
            ->title('Squad Member Created')
            ->body("Squad member created with referral code: {$this->record->referral_code}")
            ->success()
            ->send();
    }
}
