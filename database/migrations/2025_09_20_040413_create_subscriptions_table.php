<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('website_id')->constrained('websites')->onDelete('cascade');
            $table->foreignId('subscriber_id')->constrained('subscribers')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['website_id', 'subscriber_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
