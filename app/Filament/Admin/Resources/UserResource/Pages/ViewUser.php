<?php

namespace App\Filament\Admin\Resources\UserResource\Pages;

use App\Filament\Admin\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\IconEntry;

class ViewUser extends ViewRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Personal Information')
                    ->schema([
                        TextEntry::make('id')
                            ->label('User ID'),
                        TextEntry::make('firstname')
                            ->label('First Name'),
                        TextEntry::make('lastname')
                            ->label('Last Name'),
                        TextEntry::make('middlename')
                            ->label('Middle Name')
                            ->placeholder('—'),
                        TextEntry::make('email')
                            ->label('Email')
                            ->copyable(),
                        TextEntry::make('phone')
                            ->label('Phone')
                            ->copyable(),
                        TextEntry::make('gender')
                            ->label('Gender')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'male' => 'blue',
                                'female' => 'pink',
                            }),
                    ])
                    ->columns(2),

                Section::make('Account Information')
                    ->schema([
                        IconEntry::make('email_verified_at')
                            ->label('Email Verified')
                            ->boolean()
                            ->getStateUsing(fn ($record) => !is_null($record->email_verified_at)),
                        TextEntry::make('email_verified_at')
                            ->label('Email Verified At')
                            ->dateTime()
                            ->placeholder('Not verified'),
                        TextEntry::make('created_at')
                            ->label('Account Created')
                            ->dateTime(),
                        TextEntry::make('updated_at')
                            ->label('Last Updated')
                            ->dateTime(),
                    ])
                    ->columns(2),

                Section::make('Squad Member Information')
                    ->schema([
                        IconEntry::make('is_squad_member')
                            ->label('Is Squad Member')
                            ->boolean()
                            ->getStateUsing(fn ($record) => $record->squadMember()->exists()),
                        TextEntry::make('squadMember.referral_code')
                            ->label('Referral Code')
                            ->placeholder('—')
                            ->copyable(),
                        TextEntry::make('squadMember.created_at')
                            ->label('Squad Member Since')
                            ->dateTime()
                            ->placeholder('—'),
                    ])
                    ->columns(2),

                Section::make('DLB Registration Information')
                    ->schema([
                        TextEntry::make('dlbRegistration.age_group')
                            ->label('Age Group')
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.education')
                            ->label('Education')
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.occupation')
                            ->label('Occupation')
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.msword_level')
                            ->label('MS Word Level')
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.msexcel_level')
                            ->label('MS Excel Level')
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.mspptx_level')
                            ->label('MS PowerPoint Level')
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.motivation')
                            ->label('Motivation')
                            ->placeholder('—')
                            ->columnSpanFull(),
                        TextEntry::make('dlbRegistration.hear_source')
                            ->label('How They Heard About Us')
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.referral')
                            ->label('Referred By')
                            ->placeholder('—'),
                        IconEntry::make('dlbRegistration.will_commit')
                            ->label('Will Commit')
                            ->boolean()
                            ->placeholder('—'),
                        TextEntry::make('dlbRegistration.created_at')
                            ->label('Registration Date')
                            ->dateTime()
                            ->placeholder('—'),
                    ])
                    ->columns(2)
                    ->visible(fn ($record) => $record->dlbRegistration()->exists()),
            ]);
    }
}
