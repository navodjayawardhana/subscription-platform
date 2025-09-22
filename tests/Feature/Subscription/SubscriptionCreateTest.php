<?php

namespace Subscription;

use App\Models\Subscriber;
use App\Models\Website;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class SubscriptionCreateTest extends TestCase
{

    use RefreshDatabase;

    public function test_create_subscription_success(): void
    {
        $website = Website::factory()->create();
        $subscriber = Subscriber::factory()->create();

        $data = [
            'website_id'    => $website->id,
            'subscriber_id' => $subscriber->id,
        ];

        $response = $this->postJson('/api/create-subscription', $data);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Subscription created successfully',
        ]);

        $this->assertDatabaseHas('subscriptions', $data);
    }

    public function test_create_subscription_fails_with_invalid_ids(): void
    {
        $data = [
            'website_id'    => 'invalid-id',
            'subscriber_id' => 'invalid-id',
        ];

        $response = $this->postJson('/api/create-subscription', $data);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors',
        ]);
    }
}
