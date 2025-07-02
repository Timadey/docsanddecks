<?php

namespace App\Filament\Resources\MyReferralResource\Pages;

use App\Filament\Resources\MyReferralResource;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\IconEntry;

class ViewMyReferral extends ViewRecord
{
    protected static string $resource = MyReferralResource::class;

    protected static ?string $title = 'Referral Details';

    protected function getHeaderActions(): array
    {
        return [
            // No actions for read-only view
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Participant Information')
                    ->schema([
                        TextEntry::make('user.firstname')
                            ->label('First Name'),
                        TextEntry::make('user.lastname')
                            ->label('Last Name'),
                        TextEntry::make('user.email')
                            ->label('Email')
                            ->getStateUsing(fn ($record) => substr($record->user->email, 0, 3) . '***' . strstr($record->user->email, '@')),
                        TextEntry::make('user.phone')
                            ->label('Phone')
                            ->getStateUsing(fn ($record) => substr($record->user->phone, 0, 4) . '***' . substr($record->user->phone, -3)),
                        TextEntry::make('user.gender')
                            ->label('Gender')
                            ->badge()
                            ->color(fn ($state) => match ($state) {
                                'male' => 'blue',
                                'female' => 'pink',
                                default => 'gray',
                            }),
                        TextEntry::make('created_at')
                            ->label('Registration Date')
                            ->dateTime(),
                    ])
                    ->columns(2),

//                Section::make('Training Information')
//                    ->schema([
//                        TextEntry::make('age_group')
//                            ->label('Age Group'),
//                        TextEntry::make('education')
//                            ->label('Education'),
//                        TextEntry::make('occupation')
//                            ->label('Occupation'),
//                        TextEntry::make('msword_level')
//                            ->label('MS Word Level'),
//                        TextEntry::make('msexcel_level')
//                            ->label('MS Excel Level'),
//                        TextEntry::make('mspptx_level')
//                            ->label('MS PowerPoint Level'),
//                    ])
//                    ->columns(2),

                Section::make('Payment Status')
                    ->schema([
                        IconEntry::make('payment_status')
                            ->label('Payment Completed')
                            ->boolean()
                            ->getStateUsing(fn ($record) => $record->payment && $record->payment->status === 'success'),
                        TextEntry::make('payment.amount_paid')
                            ->label('Amount Paid')
                            ->money('NGN')
                            ->placeholder('Not paid yet'),
                        TextEntry::make('payment.paid_at')
                            ->label('Payment Date')
                            ->dateTime()
                            ->placeholder('Not paid yet'),
                    ])
                    ->columns(2)
                    ->visible(fn ($record) => $record->payment),
            ]);
    }
}
