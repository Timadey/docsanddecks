<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\SquadMemberResource\Pages;
use App\Modules\SquadMember\SquadMember;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class SquadMemberResource extends Resource
{
    protected static ?string $model = SquadMember::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';

    protected static ?string $navigationGroup = 'User Management';

    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Squad Members';

    protected static ?string $modelLabel = 'Squad Member';

    protected static ?string $pluralModelLabel = 'Squad Members';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('User')
                    ->relationship(
                        'user',
                        'email',
                        fn (Builder $query) => $query->whereDoesntHave('squadMember')
                    )
                    ->getOptionLabelFromRecordUsing(fn ($record) => "{$record->firstname} {$record->lastname} ({$record->email})")
                    ->searchable(['firstname', 'lastname', 'email'])
                    ->required()
                    ->preload(),
                Forms\Components\TextInput::make('referral_code')
                    ->label('Referral Code')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(50)
                    ->default(fn () => strtoupper(Str::random(8)))
                    ->helperText('A unique referral code for this squad member'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->query(
                SquadMember::query()
                    ->with(['user', 'dlbRegistrations.payment'])
                    ->withCount('dlbRegistrations')
            )
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.firstname')
                    ->label('First Name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.lastname')
                    ->label('Last Name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.email')
                    ->label('Email')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('user.phone')
                    ->label('Phone')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('referral_code')
                    ->label('Referral Code')
                    ->searchable()
                    ->copyable()
                    ->badge()
                    ->color('success'),
                Tables\Columns\TextColumn::make('dlbRegistrations_count')
                    ->label('Total Referrals')
                    ->getStateUsing(fn ($record) => $record->dlbRegistrations()->count())
                    ->badge()
                    ->color('info'),
                Tables\Columns\TextColumn::make('paid_referrals_count')
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
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Member Since')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('has_referrals')
                    ->label('Has Referrals')
                    ->query(fn (Builder $query): Builder => $query->has('dlbRegistrations')),
                Tables\Filters\Filter::make('no_referrals')
                    ->label('No Referrals')
                    ->query(fn (Builder $query): Builder => $query->doesntHave('dlbRegistrations')),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Action::make('regenerateCode')
                    ->label('Regenerate Code')
                    ->icon('heroicon-o-arrow-path')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->modalHeading('Regenerate Referral Code')
                    ->modalDescription('Are you sure you want to regenerate the referral code? This will invalidate the current code.')
                    ->action(function ($record) {
                        // Generate unique referral code
                        do {
                            $referralCode = strtoupper(Str::random(8));
                        } while (SquadMember::where('referral_code', $referralCode)->exists());

                        $record->update(['referral_code' => $referralCode]);

                        Notification::make()
                            ->title('Referral Code Regenerated')
                            ->body("New referral code: {$referralCode}")
                            ->success()
                            ->send();
                    }),
                Tables\Actions\DeleteAction::make()
                    ->label('Remove')
                    ->modalHeading('Remove Squad Member')
                    ->modalDescription('Are you sure you want to remove this squad member? This action cannot be undone.'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label('Remove Selected'),
                ]),
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
            'index' => Pages\ListSquadMembers::route('/'),
            'create' => Pages\CreateSquadMember::route('/create'),
            'view' => Pages\ViewSquadMember::route('/{record}'),
            'edit' => Pages\EditSquadMember::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
