<?php

namespace App\Action\Subscriber;

use App\Models\User;
use App\Models\Subscriber;
use App\Services\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateUserAndSubscriber
{
    public function __invoke(array $request): array
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name'  => $request['name'],
                'email'      => $request['email'],
                'password'   => bcrypt('password'),
            ]);

            $subscriber = Subscriber::create([
                'email' => $request['email'],
            ]);

            DB::commit();

            return CommonResponse::sendSuccessResponseWithData('User and Subscriber created successfully', [
                'user'       => $user,
                'subscriber' => $subscriber,
            ]);
        } catch (\Exception $e) {
            Log::error('User & Subscriber creation error: ' . $e->getMessage());
            DB::rollBack();

            return CommonResponse::sendBadResponseWithMessage('Failed to create user and subscriber');
        }
    }
}
