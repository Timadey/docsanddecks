<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dlb_registration', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('age_group', 50);
            $table->string('msword_level', 50);
            $table->string('msexcel_level', 50);
            $table->string('mspptx_level', 50);
            $table->string('education');
            $table->string('occupation');
            $table->string('motivation', 1000);
            $table->string('hear_source', 100);
            $table->string('referral', 100)->nullable();
            $table->boolean('will_commit');
            $table->timestamps();
        });

        Schema::create('squad_member', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('referral_code', 50)->unique();
            $table->timestamps();
        });

        Schema::create('payment', function (Blueprint $table) {
            $table->uuid('id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->uuid('service_id')->nullable()->index()->comment('Id of what they are paying for');
            $table->string('reference')->unique();
            $table->decimal('amount_charged', 10, 2);
            $table->decimal('amount_paid', 10, 2);
            $table->string('currency', 10)->default('NGN');
            $table->enum('status', ['pending', 'success', 'failed', 'abandoned'])->default('pending');
            $table->string('payment_method', 50)->nullable();
            $table->string('provider');
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dlb_registration');
        Schema::dropIfExists('squad_member');
        Schema::dropIfExists('payment');
    }
};
