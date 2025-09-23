<?php

namespace App\Console\Commands;

use App\Mail\PostPublished;
use App\Models\PostNotificationOutbox;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ProcessPostNotificationOutbox extends Command
{
    protected $signature = 'post:process-outbox {--limit=200}';
    protected $description = 'Send queued post notifications with retry (max 3) and auto-delete on permanent failure.';

    public function handle(): int
    {
        $limit = (int) $this->option('limit');

        PostNotificationOutbox::due()
            ->limit($limit)
            ->get()
            ->each(fn (PostNotificationOutbox $row) => $this->attemptSend($row));

        return self::SUCCESS;
    }

    protected function attemptSend(PostNotificationOutbox $row): void
    {
        try {
            Mail::to($row->email)->send(new PostPublished($row->post));
            $row->delete();
        } catch (\Throwable $e) {
            $attempts = $row->attempts + 1;

            if ($attempts >= 3) {
                Log::warning('Deleting outbox row after 3 failed attempts', [
                    'outbox_id' => $row->id,
                    'email'     => $row->email,
                    'error'     => $e->getMessage(),
                ]);
                $row->delete();
                return;
            }

            $backoff = $attempts === 1 ? 10 : 30;

            $row->update([
                'attempts'       => $attempts,
                'next_attempt_at'=> now()->addMinutes($backoff),
                'last_error'     => $e->getMessage(),
            ]);
        }
    }
}
