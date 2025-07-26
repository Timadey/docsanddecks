<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('data_decode_registration', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('institution')->nullable();
            $table->string('department')->nullable();
            $table->string('project_topic')->nullable();
            $table->string('level')->nullable();
            $table->string('motivation')->nullable();
            $table->string('hear_source')->nullable();
            $table->boolean('will_commit')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('data_decode_registration');
    }
};
