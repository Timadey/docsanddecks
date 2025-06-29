<?php
// app/Filament/Squad/Pages/Dashboard.php

namespace App\Filament\Pages\Squad;

use App\Filament\Widgets\MyReferralStats;
use App\Modules\DLBRegistration\DlbRegistration;
//use Filament\Pages\Page;
use Filament\Widgets\StatsOverviewWidget\Stat;

class Dashboard extends \Filament\Pages\Dashboard
{
    //protected static string $view = 'filament.pages.squad-dashboard';
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static ?string $navigationLabel = 'Dashboard';

    protected static ?string $title = 'Squad Dashboard';
    protected static ?string $navigationGroup = 'Referrals';

}
