<?php

namespace App\Action\Website;

use App\Services\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GetAllWebsite
{
    public function __invoke(): array
    {
        try {
            $websites = DB::table('websites')->get();

            return CommonResponse::sendSuccessResponseWithData('websites', $websites);
        } catch (\Exception $e) {
            Log::error('GetAllWebsite Error: ' . $e->getMessage());

            return CommonResponse::sendBadResponseWithMessage('Failed to retrieve websites');
        }
    }
}
