<?php

namespace App\Http\Controllers;

use App\Action\Website\CreateWebsite;
use App\Action\Website\GetAllWebsite;
use App\Http\Requests\Website\WebsiteCreateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function createWebsite(WebsiteCreateRequest $request, CreateWebsite $createWebsite): JsonResponse
    {
        $validated = $request->validated();

        return response()->json(
            $createWebsite($validated)
        );
    }

    public function getAllWebsite(GetAllWebsite $allWebsite): JsonResponse
    {
        return response()->json($allWebsite());
    }
}
