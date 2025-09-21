<?php

namespace Tests\Unit;

use App\Action\Post\CreatePost;
use App\Mail\PostPublished;
use App\Models\Subscriber;
use App\Models\Subscription;
use App\Models\User;
use App\Models\Website;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class CreatePostTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_post_create_sends_mail_to_subscribers_only(): void
    {
        Mail::fake();

        $subscribeUser1 = User::factory()->create();
        $subscribeUser2 = User::factory()->create();
        $subscribeUser3 = User::factory()->create();
        $unSubscribeUser1 = User::factory()->create();
        $unSubscribeUser2 = User::factory()->create();

        $website = Website::factory()->create();

        $sub1 = Subscriber::factory()->create([
            'email' => $subscribeUser1->email
        ]);
        $sub2 = Subscriber::factory()->create([
            'email' => $subscribeUser2->email
        ]);
        $sub3 = Subscriber::factory()->create([
            'email' => $subscribeUser3->email
        ]);

        Subscription::factory()->create([
            'website_id' => $website->id,
            'subscriber_id' => $sub1->id
        ]);
        Subscription::factory()->create([
            'website_id' => $website->id,
            'subscriber_id' => $sub2->id
        ]);
        Subscription::factory()->create([
            'website_id' => $website->id,
            'subscriber_id' => $sub3->id
        ]);


        $action = app(CreatePost::class);
        $response = $action([
            'website_id'  => $website->id,
            'title'       => 'My First Post',
            'description' => 'This is a test post description',
        ]);

        $this->assertEquals(
            'Post created successfully',
            $response['message']);
        $this->assertEquals(
            'My First Post',
            $response['data']->title);


        $this->assertDatabaseHas('posts', [
            'website_id' => $website->id,
            'title'      => 'My First Post',
        ]);

        Mail::assertQueued(PostPublished::class, 3);

        Mail::assertQueued(PostPublished::class,
            fn ($mail) => $mail->hasTo($subscribeUser1->email));
        Mail::assertQueued(PostPublished::class,
            fn ($mail) => $mail->hasTo($subscribeUser2->email));
        Mail::assertQueued(PostPublished::class,
            fn ($mail) => $mail->hasTo($subscribeUser3->email));

        Mail::assertNotQueued(PostPublished::class,
            fn ($mail) => $mail->hasTo($unSubscribeUser1->email));
        Mail::assertNotQueued(PostPublished::class,
            fn ($mail) => $mail->hasTo($unSubscribeUser2->email));
    }
}
