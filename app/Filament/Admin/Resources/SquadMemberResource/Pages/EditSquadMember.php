<?php

namespace App\Filament\Admin\Resources\SquadMemberResource\Pages;

use App\Filament\Admin\Resources\SquadMemberResource;
use App\Modules\SquadMember\SquadMember;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Str;

class EditSquadMember extends EditRecord
{
    protected static string $resource = SquadMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make()
                ->label('Remove Squad Member')
                ->modalHeading('Remove Squad Member')
                ->modalDescription('Are you sure you want to remove this squad member? This action cannot be undone.'),
            Actions\Action::make('regenerateCode')
                ->label('Regenerate Referral Code')
                ->icon('heroicon-o-arrow-path')
                ->color('warning')
                ->requiresConfirmation()
                ->modalHeading('Regenerate Referral Code')
                ->modalDescription('Are you sure you want to regenerate the referral code? This will invalidate the current code.')
                ->action(function () {
                    // Generate unique referral code
                    do {
                        $referralCode = strtoupper(Str::random(8));
                    } while (SquadMember::where('referral_code', $referralCode)->exists());

                    $this->record->update(['referral_code' => $referralCode]);

                    Notification::make()
                        ->title('Referral Code Regenerated')
                        ->body("New referral code: {$referralCode}")
                        ->success()
                        ->send();
                }),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Ensure referral code is unique
        if (isset($data['referral_code'])) {
            $originalCode = $data['referral_code'];
            
            // If the code is the same as current, no need to check
            if ($this->record->referral_code !== $originalCode) {
                // Check if code already exists
                while (SquadMember::where('referral_code', $data['referral_code'])
                    ->where('id', '!=', $this->record->id)
                    ->exists()) {
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
        }

        return $data;
    }
}
