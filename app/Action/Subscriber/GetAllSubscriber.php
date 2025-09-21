<?php

namespace App\Action\Subscriber;

use App\Services\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GetAllSubscriber
{
    public function __invoke(): array
    {
        try {
            $subscribers = DB::table('subscribers')->get();

            return CommonResponse::sendSuccessResponseWithData('subscribers', $subscribers);
        } catch (\Exception $e) {
            Log::error('GetAllSubscriber Error: ' . $e->getMessage());

            return CommonResponse::sendBadResponseWithMessage('Failed to retrieve subscribers');
        }
    }
}
