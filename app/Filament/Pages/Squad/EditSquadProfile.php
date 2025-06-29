<?php

namespace App\Filament\Pages\Squad;

use Filament\Notifications\Notification;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class EditSquadProfile extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-user-circle';
    protected static string $view = 'filament.pages.squad.edit-squad-profile';

    protected static ?string $navigationLabel = 'Edit Profile';
    protected static ?string $title = 'Edit Profile';
    protected static ?string $slug = 'profile';
    protected static ?string $navigationGroup = 'Profile';

    public ?string $referralCode = null;
    public ?string $password = null;

    public function mount(): void
    {
        $user = auth()->user();
        $this->referralCode = $user->squadMember->referral_code;

        $this->form->fill([
            'referralCode' => $this->referralCode,
            'password' => '',
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema($this->getFormSchema())
            ->statePath('')
            ->model(auth()->user());

    }

    protected function getFormSchema(): array
    {
        $user = auth()->user();
        $currentSquadMemberId = $user->squadMember->id;

        return [
            TextInput::make('referralCode')
                ->label('Referral Code')
                ->required()
                ->maxLength(6)
                ->rules([
                    Rule::unique('squad_member', 'referral_code')->ignore($currentSquadMemberId),
                ])
                ->helperText('Max 6 characters, must be unique.'),

            TextInput::make('password')
                ->label('New Password')
                ->password()
                ->nullable()
                ->minLength(8)
                ->helperText('Leave blank to keep your current password.'),
        ];
    }

//    protected function getActions(): array
//    {
//        return [
//            Action::make('save')
//                ->label('Save Changes')
//                ->action('submit'),
//        ];
//    }

    public function submit(): void
    {
        $data = $this->form->getState();
        $user = auth()->user();

        // Only update password if it's not empty
        if ($data['password']) {
            $user->update([
                'password' => Hash::make($data['password']),
            ]);
        }

        $user->squadMember->update([
            'referral_code' => $data['referralCode'],
        ]);

        Notification::make()
            ->title('Your profile has been updated.')
            ->success()
            ->send();
    }
}
