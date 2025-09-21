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
            $table->uuid('website_id');
            $table->foreign('website_id')->references('id')->on('websites')->onDelete('cascade');
            $table->uuid('subscriber_id');
            $table->foreign('subscriber_id')->references('id')->on('subscribers')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['website_id', 'subscriber_id']);
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
