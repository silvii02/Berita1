<?php
use App\Http\Controllers\api\ArticleController;
use App\Http\Controllers\AuthController;
use App\Models\Category;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Models\User;
use App\Http\Controllers\SliderHeadlineController;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/articles', [ArticleController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
