<?php

namespace App\Http\Controllers;

use App\Action\Post\CreatePost;
use App\Http\Requests\Post\PostCreateRequest;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function createPost(PostCreateRequest $request, CreatePost $createPost): JsonResponse
    {
        $validated = $request->validated();

        return response()->json(
            $createPost($validated)
        );
    }
}
