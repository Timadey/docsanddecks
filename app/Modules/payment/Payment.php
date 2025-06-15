<?php

namespace App\Modules\payment;

use App\Models\User;
use App\Modules\DLBRegistration\DlbRegistration;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasUuids;

    protected $table = 'payment';
    protected $fillable = [
        'user_id',
        'service_id',
        'reference',
        'amount_charged',
        'amount_paid',
        'currency',
        'status',
        'payment_method',
        'provider',
        'paid_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function dlbRegistration()
    {
        return $this->belongsTo(DlbRegistration::class, 'service_id', 'id');
    }
}
