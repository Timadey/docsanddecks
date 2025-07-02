<?php

namespace App\Modules\SquadMember;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class SquadMember extends Model
{
    protected $table = 'squad_member';
    protected $fillable = [
        'user_id',
        'referral_code',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function dlbRegistrations()
    {
        return $this->hasMany(DlbRegistration::class, 'referral', 'referral_code');
    }
}
