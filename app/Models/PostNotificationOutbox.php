<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PostNotificationOutbox extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'post_notification_outboxes';
    protected $fillable = [
        'post_id',
        'subscriber_id',
        'email',
        'attempts',
        'next_attempt_at',
        'last_error'
    ];

    protected $casts = [
        'next_attempt_at' => 'datetime',
    ];

    public function scopeDue(Builder $q): Builder
    {
        return $q->where('attempts', '<', 3)
            ->where(function ($q) {
                $q->whereNull('next_attempt_at')
                    ->orWhere('next_attempt_at', '<=', now());
            });
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
