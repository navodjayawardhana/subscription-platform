<?php

namespace App\Http\Controllers;

use App\Action\Subscriber\CreateUserAndSubscriber;
use App\Http\Requests\Subscriber\UserSubscriberCreateRequest;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function createUserSubscriber(UserSubscriberCreateRequest $request, CreateUserAndSubscriber $createUserAndSubscriber): JsonResponse
    {
        $validated = $request->validated();

        return response()->json(
            $createUserAndSubscriber($validated)
        );
    }
}
