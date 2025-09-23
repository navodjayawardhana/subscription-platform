<?php

namespace Post;
use App\Action\Post\CreatePost;
use App\Mail\PostPublished;
use App\Models\Subscriber;
use App\Models\Subscription;
use App\Models\User;
use App\Models\Website;
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
}
