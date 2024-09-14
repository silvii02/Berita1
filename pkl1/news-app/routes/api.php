<?php

use App\Http\Controllers\Api\ArticleController;


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Category;
use App\Models\Article;
use App\Models\User;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\SliderHeadlineController;


// Rute yang memerlukan otentikasi
Route::middleware('auth:sanctum')->group(function () {
   Route::put('articles/{id}', [ArticleController::class, 'update']); 
   Route::post('articles', [ArticleController::class, 'store']);
   Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);
   Route::post('/articles/{id}/set-as-slider', [SliderHeadlineController::class, 'setAsSlider']);
   Route::post('/articles/{id}/unset-slider', [SliderHeadlineController::class, 'unsetSlider']);

});


// Rute publik
Route::post('/login', [AuthController::class, 'login']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
Route::post('/createcategory', [CategoryController::class, 'store']);
Route::get('/articleSlider', [SliderHeadlineController::class, 'getSliderArticles']);
Route::get('categories', function() {
    return Category::all();
    
});

// ini utk bikin artikel terkait
Route::get('articles/related/{category_id}/{current_article_id}', [ArticleController::class, 'getRelatedArticles']);

// ini utuk bikin artikel terkait
Route::get('articles/related/{category_id}/{current_article_id}', [ArticleController::class, 'getRelatedArticles']);

Route::post('upload-image', [ImageController::class, 'uploadImage']);
Route::get('/search', [ArticleController::class, 'search']);
