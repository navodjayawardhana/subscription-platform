<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\WebsiteController;
use Illuminate\Support\Facades\Route;


Route::post('/create-website', [WebsiteController::class, 'createWebsite']);
Route::get('/all-websites', [WebsiteController::class, 'getAllWebsite']);

Route::post('/create-post', [PostController::class, 'createPost']);
