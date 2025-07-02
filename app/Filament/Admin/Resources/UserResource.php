<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\UserResource\Pages;
use App\Models\User;
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

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationGroup = 'User Management';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Personal Information')
                    ->schema([
                        Forms\Components\TextInput::make('firstname')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('lastname')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('middlename')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(15),
                        Forms\Components\Select::make('gender')
                            ->options([
                                'male' => 'Male',
                                'female' => 'Female',
                            ])
                            ->required(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Account Information')
                    ->schema([
                        Forms\Components\TextInput::make('password')
                            ->password()
                            ->required(fn (string $context): bool => $context === 'create')
                            ->minLength(8)
                            ->dehydrated(fn ($state) => filled($state))
                            ->revealable(),
                        Forms\Components\DateTimePicker::make('email_verified_at')
                            ->label('Email Verified At')
                            ->displayFormat('M d, Y H:i:s'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('firstname')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('lastname')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('gender')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'male' => 'blue',
                        'female' => 'pink',
                    }),
                Tables\Columns\IconColumn::make('dlbRegistration.payment.status')
                    ->label('DLB Paid')
                    ->boolean()
                    ->getStateUsing(fn ($record) => optional($record->dlbRegistration?->payment)->status === 'success'),
                Tables\Columns\IconColumn::make('is_squad_member')
                    ->label('Squad Member')
                    ->boolean()
                    ->getStateUsing(fn ($record) => $record->squadMember()->exists()),
                Tables\Columns\TextColumn::make('dlbRegistration.age_group')
                    ->label('Age Group')
                    ->placeholder('—'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('has_paid_dlb_registration')
                    ->label('Has Paid DLB Registration')
                    ->query(fn (Builder $query): Builder => $query->whereHas('dlbRegistration.payment', function ($q) {
                        $q->where('status', 'success');
                    })),
                Tables\Filters\Filter::make('is_squad_member')
                    ->label('Squad Members Only')
                    ->query(fn (Builder $query): Builder => $query->whereHas('squadMember')),
                Tables\Filters\Filter::make('has_dlb_registration')
                    ->label('Has DLB Registration')
                    ->query(fn (Builder $query): Builder => $query->whereHas('dlbRegistration')),
                Tables\Filters\SelectFilter::make('gender')
                    ->options([
                        'male' => 'Male',
                        'female' => 'Female',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Action::make('makeSquadMember')
                    ->label('Make Squad Member')
                    ->icon('heroicon-o-star')
                    ->color('success')
                    ->visible(fn ($record) => !$record->squadMember()->exists())
                    ->requiresConfirmation()
                    ->modalHeading('Make Squad Member')
                    ->modalDescription(fn ($record) => "Are you sure you want to make {$record->firstname} {$record->lastname} a squad member? This will generate a unique referral code for them.")
                    ->action(function ($record) {
                        // Generate unique referral code
                        do {
                            $referralCode = strtoupper(Str::random(8));
                        } while (SquadMember::where('referral_code', $referralCode)->exists());

                        SquadMember::create([
                            'user_id' => $record->id,
                            'referral_code' => $referralCode,
                        ]);

                        Notification::make()
                            ->title('Squad Member Created')
                            ->body("{$record->firstname} {$record->lastname} is now a squad member with referral code: {$referralCode}")
                            ->success()
                            ->send();
                    }),
                Action::make('removeSquadMember')
                    ->label('Remove Squad Member')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->visible(fn ($record) => $record->squadMember()->exists())
                    ->requiresConfirmation()
                    ->modalHeading('Remove Squad Member')
                    ->modalDescription(fn ($record) => "Are you sure you want to remove {$record->firstname} {$record->lastname} from squad members? This action cannot be undone.")
                    ->action(function ($record) {
                        $record->squadMember()->delete();

                        Notification::make()
                            ->title('Squad Member Removed')
                            ->body("{$record->firstname} {$record->lastname} has been removed from squad members.")
                            ->success()
                            ->send();
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('makeSquadMembers')
                        ->label('Make Squad Members')
                        ->icon('heroicon-o-star')
                        ->color('success')
                        ->requiresConfirmation()
                        ->modalHeading('Make Selected Users Squad Members')
                        ->modalDescription('Are you sure you want to make all selected users squad members? This will generate unique referral codes for each of them.')
                        ->action(function ($records) {
                            $count = 0;
                            foreach ($records as $record) {
                                if (!$record->squadMember()->exists()) {
                                    // Generate unique referral code
                                    do {
                                        $referralCode = strtoupper(Str::random(8));
                                    } while (SquadMember::where('referral_code', $referralCode)->exists());

                                    SquadMember::create([
                                        'user_id' => $record->id,
                                        'referral_code' => $referralCode,
                                    ]);
                                    $count++;
                                }
                            }

                            Notification::make()
                                ->title('Squad Members Created')
                                ->body("{$count} users have been made squad members.")
                                ->success()
                                ->send();
                        }),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'view' => Pages\ViewUser::route('/{record}'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
