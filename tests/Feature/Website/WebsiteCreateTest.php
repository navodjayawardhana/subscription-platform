<?php

namespace Tests\Feature\Website;

use App\Models\Website;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WebsiteCreateTest extends TestCase
{
    use RefreshDatabase;

    public function test_website_create_success(): void
    {
        $websiteData = Website::factory()->make()->toArray();

        $response = $this->postJson('/api/create-website', $websiteData);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Website created successfully',
        ]);

        $this->assertDatabaseHas('websites', [
            'name' => $websiteData['name'],
            'url'  => $websiteData['url'],
        ]);
    }

    public function test_website_create_fails_with_invalid_data(): void
    {
        $data = [
            'name' => '',
            'url'  => 'url',
        ];

        $response = $this->postJson('/api/create-website', $data);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors',
        ]);
    }

    public function test_website_create_fails_with_duplicate_url(): void
    {
        $existing = Website::factory()->create();

        $data = [
            'name' => 'Duplicate Website',
            'url'  => $existing->url,
        ];

        $response = $this->postJson('/api/create-website', $data);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors',
        ]);
    }
}
