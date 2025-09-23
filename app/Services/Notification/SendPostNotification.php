<?php

namespace App\Services\Notification;

use App\Mail\PostPublished;
use App\Models\Post;
use App\Models\PostNotificationOutbox;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class SendPostNotification
{
    public function handle(Post $post): void
    {
        $subscribers = $post->website->subscribers;

        foreach ($subscribers as $subscriber) {
            $validator = Validator::make(['email' => $subscriber->email], ['email' => 'required|email']);
            if ($validator->fails()) {
                continue;
            }
            DB::beginTransaction();
            try {
                Mail::to($subscriber->email)->send(new PostPublished($post));
                DB::commit();
            } catch (\Throwable $e) {
                DB::rollBack();
                PostNotificationOutbox::updateOrCreate(
                    [
                        'post_id'       => $post->id,
                        'subscriber_id' => $subscriber->id,
                    ],
                    [
                        'email'          => $subscriber->email,
                        'attempts'       => 0,
                        'next_attempt_at'=> now()->addMinutes(5),
                        'last_error'     => $e->getMessage(),
                    ]
                );
            }
        }
    }
}
