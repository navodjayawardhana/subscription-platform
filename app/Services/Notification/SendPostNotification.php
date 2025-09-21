<?php

namespace App\Services\Notification;

use App\Mail\PostPublished;
use App\Models\Post;
use Illuminate\Support\Facades\Mail;

class SendPostNotification
{
    public function handle(Post $post): void
    {
        $subscribers = $post->website->subscribers;

        foreach ($subscribers as $subscriber) {
            Mail::to($subscriber->email)->queue(new PostPublished($post));
        }
    }
}
