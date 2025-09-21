<?php

namespace App\Http\Controllers;

use App\Action\Subscription\CreateSubscription;
use App\Http\Requests\Subscription\SubscriptionCreateRequest;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller
{
    public function createSubscription(SubscriptionCreateRequest $request, CreateSubscription $createSubscription): JsonResponse
    {
        $validated = $request->validated();

        return response()->json(
            $createSubscription($validated)
        );
    }
}
