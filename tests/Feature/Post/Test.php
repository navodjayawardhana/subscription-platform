<?php

namespace Post;

use App\Models\Post;
use App\Models\Website;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Test extends TestCase
{
    use RefreshDatabase;

    public function test_new_post_create(): void
    {
        $website = Website::factory()->create();

        $post = Post::factory()->create([
            'website_id' => $website->id
        ]);

        $response = $this->postJson('api/create-post', $post->toArray());

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Post created successfully',
        ]);

        $this->assertDatabaseHas('posts', [
            'website_id' => $website->id,
            'title'      => $post->title,
        ]);

    }

    public function test_post_create_validation_fails(): void
    {
        $response = $this->postJson('api/create-post', [
            'title' => '',
        ]);

        $response->assertStatus(422);
        $response->assertJsonStructure([
            'message',
            'errors',
        ]);
    }

}
