<?php

namespace App\Filament\Admin\Resources\SquadMemberResource\Pages;

use App\Filament\Admin\Resources\SquadMemberResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSquadMembers extends ListRecords
{
    protected static string $resource = SquadMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
