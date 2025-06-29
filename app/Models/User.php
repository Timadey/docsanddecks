<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Modules\SquadMember\SquadMember;
use App\Shared\Enums\RoleEnum;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser, HasName
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'middlename',
        'phone',
        'email',
        'gender',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function dlbRegistration()
    {
        return $this->hasOne(\App\Modules\DLBRegistration\DlbRegistration::class, 'user_id');
    }

    public function squadMember()
    {
        return $this->hasOne(SquadMember::class, 'user_id');
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class, 'user_id');
    }

    public function getFilamentName(): string
    {
        return "{$this->firstname} {$this->lastname}";
    }

    public function canAccessPanel(Panel $panel): bool
    {
        if ($panel->getId() === 'squad-member') {
            return $this->squadMember()->exists();
        }

        return true; // Allow access to other panels (like admin) if needed
    }
}
