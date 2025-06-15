<?php

namespace App\Modules\DLBRegistration;

use App\Models\User;
use App\Modules\payment\Payment;
use App\Modules\SquadMember\SquadMember;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class DlbRegistration extends Model
{
    use HasUuids;

    protected $table = 'dlb_registration';
    protected $fillable = [
        'user_id',
        'age_group',
        'msword_level',
        'msexcel_level',
        'mspptx_level',
        'education',
        'occupation',
        'motivation',
        'hear_source',
        'referral',
        'will_commit',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function referredBy()
    {
        return $this->belongsTo(SquadMember::class, 'referral', 'referral_code');
    }
    public function payment()
    {
        return $this->hasOne(Payment::class, 'service_id', 'id');
    }
}
