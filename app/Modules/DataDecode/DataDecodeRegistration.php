<?php

namespace App\Modules\DataDecode;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataDecodeRegistration extends Model
{
    use HasFactory;

    protected $table = 'data_decode_registration';

    protected $fillable = [
        'user_id',
        'institution',
        'department',
        'level',
        'project_topic',
        'motivation',
        'hear_source',
        'will_commit',
        'created_at',
        'updated_at',
    ];
}
