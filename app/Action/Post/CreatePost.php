<?php

namespace App\Action\Post;

use App\Models\Post;
use App\Services\Notification\SendPostNotification;
use App\Services\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreatePost
{
    protected SendPostNotification $notifier;

    public function __construct(SendPostNotification $notifier)
    {
        $this->notifier = $notifier;
    }

    public function __invoke(array $request): array
    {
        DB::beginTransaction();

        try {
            $post = Post::create([
                'website_id'  => $request['website_id'],
                'title'       => $request['title'],
                'description' => $request['description'],
            ]);

            DB::commit();

            $this->notifier->handle($post);

            return CommonResponse::sendSuccessResponseWithData('Post created successfully', $post);
        } catch (\Exception $e) {
            Log::error('Post creation error: ' . $e->getMessage());
            DB::rollBack();

            return CommonResponse::sendBadResponseWithMessage('Post creation failed');
        }
    }
}
