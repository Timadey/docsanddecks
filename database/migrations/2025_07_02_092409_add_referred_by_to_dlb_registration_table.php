<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Modules\SquadMember\SquadMember;
use App\Modules\DLBRegistration\DlbRegistration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('dlb_registration', function (Blueprint $table) {
            // Add the new foreign key column
            $table->foreignId('referred_by')->nullable()->after('referral')
                  ->constrained('squad_member')->onDelete('set null');
        });

        // Migrate existing data from referral codes to squad member IDs
        $registrations = DlbRegistration::whereNotNull('referral')->get();
        
        foreach ($registrations as $registration) {
            $squadMember = SquadMember::where('referral_code', $registration->referral)->first();
            if ($squadMember) {
                $registration->update(['referred_by' => $squadMember->id]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dlb_registration', function (Blueprint $table) {
            $table->dropForeign(['referred_by']);
            $table->dropColumn('referred_by');
        });
    }
};
