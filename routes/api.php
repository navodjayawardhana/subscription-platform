<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebsiteController;
use Illuminate\Support\Facades\Route;

Route::post('/create-user-subscriber', [UserController::class, 'createUserSubscriber']);
Route::get('/subscribers', [UserController::class, 'getAllSubscriber']);

Route::post('/create-website', [WebsiteController::class, 'createWebsite']);
Route::get('/all-websites', [WebsiteController::class, 'getAllWebsite']);

Route::post('/create-subscription', [SubscriptionController::class, 'createSubscription']);

Route::post('/create-post', [PostController::class, 'createPost']);
