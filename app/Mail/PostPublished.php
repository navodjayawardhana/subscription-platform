<?php

namespace App\Mail;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PostPublished extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public Post $post;

    public int $tries = 5;
    public int $backoff = 60;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    public function build()
    {
        return $this->subject($this->post->title)
            ->view('emails.post')
            ->with([
                'title' => $this->post->title,
                'description' => $this->post->description,
            ]);
    }
}
