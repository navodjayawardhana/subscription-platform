<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserSubscriberTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user_and_subscriber_success(): void
    {
        $fakeUser = User::factory()->make();

        $data = [
            'name' => $fakeUser->name,
            'email'      => $fakeUser->email,
        ];

        $response = $this->postJson('/api/create-user-subscriber', $data);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'User and Subscriber created successfully',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => $data['name'],
            'email'      => $data['email'],
        ]);

        $this->assertDatabaseHas('subscribers', [
            'email' => $data['email'],
        ]);
    }

    public function test_create_user_and_subscriber_fails_with_duplicate_email(): void
    {

        $existing = User::factory()->create([
            'email' => 'navod@gmail.com'
        ]);

        $data = [
            'name' => 'navod',
            'email'      => $existing->email,
        ];

        $response = $this->postJson('/api/create-user-subscriber', $data);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors',
        ]);
    }
}
