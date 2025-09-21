<?php

namespace App\Action\Subscription;

use App\Models\Subscription;
use App\Services\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateSubscription
{
    public function __invoke(array $request): array
    {
        DB::beginTransaction();

        try {
            $subscription = Subscription::create([
                'website_id'    => $request['website_id'],
                'subscriber_id' => $request['subscriber_id'],
            ]);

            DB::commit();

            return CommonResponse::sendSuccessResponseWithData('Subscription created successfully', $subscription);
        } catch (\Exception $e) {
            Log::error('Subscription creation error: ' . $e->getMessage());
            DB::rollBack();

            return CommonResponse::sendBadResponseWithMessage('Subscription creation failed');
        }
    }
}
