<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MyReferralResource\Pages;
use App\Modules\DLBRegistration\DlbRegistration;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class MyReferralResource extends Resource
{
    protected static ?string $model = DlbRegistration::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'My Referrals';

    protected static ?string $modelLabel = 'Referral';

    protected static ?string $pluralModelLabel = 'Referrals';

    protected static ?string $navigationGroup = 'Referrals';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('referred_by', auth()->user()->squadMember->id);
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.firstname')
                    ->label('First Name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.lastname')
                    ->label('Last Name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.email')
                    ->label('Email')
                    ->getStateUsing(fn ($record) => substr($record->user->email, 0, 3) . '***' . strstr($record->user->email, '@')),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Joined')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.gender')
                    ->label('Gender')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'male' => 'blue',
                        'female' => 'pink',
                        default => 'gray',
                    }),
                Tables\Columns\IconColumn::make('payment_status')
                    ->label('Paid')
                    ->boolean()
                    ->getStateUsing(fn ($record) => $record->payment && $record->payment->status === 'success'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('has_payment')
                    ->label('Payment Status')
                    ->queries(
                        true: fn (Builder $query) => $query->whereHas('payment', fn (Builder $query) => $query->where('status', 'success')),
                        false: fn (Builder $query) => $query->whereDoesntHave('payment', fn (Builder $query) => $query->where('status', 'success')),
                        blank: fn (Builder $query) => $query,
                    ),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                //
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMyReferrals::route('/'),
            'view' => Pages\ViewMyReferral::route('/{record}'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return false;
    }
}
