<?php

namespace App\Action\Website;

use App\Models\Website;
use App\Services\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateWebsite
{
    public function __invoke(array $request): array
    {
        DB::beginTransaction();

        try {
            $website = Website::create([
                'name' => $request['name'],
                'url'  => $request['url'],
            ]);

            DB::commit();

            return CommonResponse::sendSuccessResponseWithData('Website created successfully', $website);
        } catch (\Exception $e) {
            Log::error('Website creation error: ' . $e->getMessage());
            DB::rollBack();

            return CommonResponse::sendBadResponseWithMessage('Website creation failed');
        }
    }
}
