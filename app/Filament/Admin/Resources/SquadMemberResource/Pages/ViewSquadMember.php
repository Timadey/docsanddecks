<?php

namespace App\Filament\Admin\Resources\SquadMemberResource\Pages;

use App\Filament\Admin\Resources\SquadMemberResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\IconEntry;

class ViewSquadMember extends ViewRecord
{
    protected static string $resource = SquadMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
            Actions\DeleteAction::make()
                ->label('Remove Squad Member')
                ->modalHeading('Remove Squad Member')
                ->modalDescription('Are you sure you want to remove this squad member? This action cannot be undone.'),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Squad Member Information')
                    ->schema([
                        TextEntry::make('user.firstname')
                            ->label('First Name'),
                        TextEntry::make('user.lastname')
                            ->label('Last Name'),
                        TextEntry::make('user.middlename')
                            ->label('Middle Name')
                            ->placeholder('—'),
                        TextEntry::make('user.email')
                            ->label('Email')
                            ->copyable(),
                        TextEntry::make('user.phone')
                            ->label('Phone')
                            ->copyable(),
                        TextEntry::make('user.gender')
                            ->label('Gender')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'male' => 'blue',
                                'female' => 'pink',
                                default => 'gray',
                            }),
                        TextEntry::make('referral_code')
                            ->label('Referral Code')
                            ->copyable()
                            ->badge()
                            ->color('success'),
                        TextEntry::make('created_at')
                            ->label('Squad Member Since')
                            ->dateTime(),
                    ])
                    ->columns(2),

                Section::make('Account Information')
                    ->schema([
                        IconEntry::make('user.email_verified_at')
                            ->label('Email Verified')
                            ->boolean()
                            ->getStateUsing(fn ($record) => !is_null($record->user->email_verified_at)),
                        TextEntry::make('user.email_verified_at')
                            ->label('Email Verified At')
                            ->dateTime()
                            ->placeholder('Not verified'),
                        TextEntry::make('user.created_at')
                            ->label('Account Created')
                            ->dateTime(),
                        TextEntry::make('user.updated_at')
                            ->label('Last Updated')
                            ->dateTime(),
                    ])
                    ->columns(2),

                Section::make('Referral Statistics')
                    ->schema([
                        TextEntry::make('total_referrals')
                            ->label('Total Referrals')
                            ->getStateUsing(fn ($record) => $record->dlbRegistrations()->count())
                            ->badge()
                            ->color('info'),
                        TextEntry::make('paid_referrals')
                            ->label('Paid Referrals')
                            ->getStateUsing(function ($record) {
                                return $record->dlbRegistrations()
                                    ->whereHas('payment', function ($query) {
                                        $query->where('status', 'success');
                                    })
                                    ->count();
                            })
                            ->badge()
                            ->color('success'),
                        TextEntry::make('pending_referrals')
                            ->label('Pending Payments')
                            ->getStateUsing(function ($record) {
                                return $record->dlbRegistrations()
                                    ->whereDoesntHave('payment', function ($query) {
                                        $query->where('status', 'success');
                                    })
                                    ->count();
                            })
                            ->badge()
                            ->color('warning'),
                        TextEntry::make('total_revenue')
                            ->label('Total Revenue Generated')
                            ->getStateUsing(function ($record) {
                                $total = $record->dlbRegistrations()
                                    ->whereHas('payment', function ($query) {
                                        $query->where('status', 'success');
                                    })
                                    ->with('payment')
                                    ->get()
                                    ->sum(function ($registration) {
                                        return $registration->payment?->amount_paid ?? 0;
                                    });
                                return number_format($total, 2);
                            })
                            ->prefix('₦')
                            ->badge()
                            ->color('primary'),
                    ])
                    ->columns(2),

                Section::make('Recent Referrals')
                    ->schema([
                        TextEntry::make('recent_referrals')
                            ->label('Latest 5 Referrals')
                            ->getStateUsing(function ($record) {
                                $referrals = $record->dlbRegistrations()
                                    ->with(['user', 'payment'])
                                    ->latest()
                                    ->limit(5)
                                    ->get();
                                
                                if ($referrals->isEmpty()) {
                                    return 'No referrals yet';
                                }
                                
                                return $referrals->map(function ($referral) {
                                    $paymentStatus = $referral->payment && $referral->payment->status === 'success' ? '✅ Paid' : '⏳ Pending';
                                    $amount = $referral->payment ? '₦' . number_format($referral->payment->amount_paid, 2) : 'No payment';
                                    return "{$referral->user->firstname} {$referral->user->lastname} - {$paymentStatus} ({$amount}) - " . $referral->created_at->format('M d, Y');
                                })->join("\n");
                            })
                            ->markdown()
                            ->columnSpanFull(),
                    ])
                    ->visible(fn ($record) => $record->dlbRegistrations()->exists()),
            ]);
    }
}
