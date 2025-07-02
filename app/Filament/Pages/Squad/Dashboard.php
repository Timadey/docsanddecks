<?php
// app/Filament/Squad/Pages/Dashboard.php

namespace App\Filament\Pages\Squad;

use App\Filament\Widgets\MyReferralStats;
use App\Filament\Widgets\ReferralInfoWidget;
use App\Modules\DLBRegistration\DlbRegistration;
//use Filament\Pages\Page;
use App\Modules\SquadMember\SquadMember;
use Filament\Resources\Components\Tab;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\Widget;

class Dashboard extends \Filament\Pages\Dashboard
{
    //protected static string $view = 'filament.pages.squad-dashboard';
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static ?string $navigationLabel = 'Dashboard';

    protected static ?string $title = 'Squad Dashboard';
    protected static ?string $navigationGroup = 'Referrals';

    public function getWidgets(): array
    {
        return [
            MyReferralStats::class,
            ReferralInfoWidget::class,
        ];
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(
                SquadMember::query()
                    ->withCount('dlbRegistrations') // as referrals
                    ->with(['dlbRegistrations.payments']) // for manual payments count
            )
            ->columns([
                TextColumn::make('user.firstname')
                    ->label('Name')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('dlb_registrations_count')
                    ->label('Referrals')
                    ->sortable(),

                TextColumn::make('payments_count')
                    ->label('Payments')
                    ->getStateUsing(function ($record) {
                        return $record->dlbRegistrations->flatMap->payments->count();
                    }),
            ])
            ->defaultSort('dlb_registrations_count', 'desc')
            ->paginated(false);
    }

}
