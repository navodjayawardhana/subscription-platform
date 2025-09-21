<?php

namespace Tests\Feature\User;

use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriberGetAllTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_subscribers(): void
    {
        Subscriber::factory(5)->create();

        $response = $this->getJson('/api/subscribers');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'data' => [
                '*' => [
                    'id',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);
    }
}
