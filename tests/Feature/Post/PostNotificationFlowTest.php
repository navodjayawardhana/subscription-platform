<?php

namespace Post;
use App\Action\Post\CreatePost;
use App\Mail\PostPublished;
use App\Models\Post;
use App\Models\PostNotificationOutbox;
use App\Models\Subscriber;
use App\Models\Subscription;
use App\Models\User;
use App\Models\Website;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class PostNotificationFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_send_immediately_sends_mail_and_no_outbox()
    {
        Mail::fake();

        $website = Website::factory()->create();

        $user = User::factory()->create();

        $subscriber = Subscriber::factory()->create([
            'email' => $user->email
        ]);

        Subscription::factory()->create([
            'website_id' => $website->id,
            'subscriber_id' => $subscriber->id,
        ]);

        $action = app(CreatePost::class);
        $action([
            'website_id' => $website->id,
            'title' => 'Sample title',
            'description' => 'Sample Description',
        ])['data'];

        Mail::assertSent(PostPublished::class, 1);
        $this->assertDatabaseCount('post_notification_outboxes', 0);
    }

    public function test_command_retries_and_deletes_after_three_failures()
    {
        $website = Website::factory()->create();

        $user = User::factory()->create();

        $subscriber = Subscriber::factory()->create([
            'email' => $user->email
        ]);

        Subscription::factory()->create([
            'website_id' => $website->id,
            'subscriber_id' => $subscriber->id,
        ]);

        $post = Post::factory()->create([
            'website_id' => $website->id
        ]);

        PostNotificationOutbox::create([
            'post_id' => $post->id,
            'subscriber_id' => $subscriber->id,
            'email' => $subscriber->email,
        ]);

        Mail::shouldReceive('to')->andReturnSelf();
        Mail::shouldReceive('send')->andThrow(new Exception('SMTP fail'));

        $this->artisan('post:process-outbox')->assertExitCode(0);
        $this->assertDatabaseHas('post_notification_outboxes', ['attempts' => 1]);

        PostNotificationOutbox::query()->update(['next_attempt_at' => now()]);

        $this->artisan('post:process-outbox')->assertExitCode(0);
        $this->assertDatabaseHas('post_notification_outboxes', ['attempts' => 2]);

        PostNotificationOutbox::query()->update(['next_attempt_at' => now()]);

        $this->artisan('post:process-outbox')->assertExitCode(0);
        $this->assertDatabaseCount('post_notification_outboxes', 0);
    }


}
