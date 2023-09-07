<?php

use App\Enums\UserRole;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//
////    Route::post('create', [\App\Http\Controllers\CourseController::class, 'createCourse']);
//});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('user/create', [UserController::class, 'create']);


Route::group(['middleware' => 'cors'], function () {
    //category
    Route::get('category', [CategoryController::class, 'getAllCategories']);
    Route::get('category/{id}', [CategoryController::class, 'getCategory']);
    Route::put('category/update/{id}', [CategoryController::class, 'updateCategory']);
    Route::delete('category/delete/{id}', [CategoryController::class, 'deleteCategory']);

    //course
    Route::get('courses', [CourseController::class, 'getAllCourses']);
    Route::get('courses/{id}', [CourseController::class, 'getCourse']);
    Route::post('courses/create', [CourseController::class, 'createCourse']);
    Route::put('courses/update/{id}', [CourseController::class, 'updateCourse']);
    Route::delete('courses/delete/{id}', [CourseController::class, 'deleteCourse']);
    Route::get('courses/{id}/files', [CourseController::class, 'getFiles']);
    Route::get('courses/category/{categoryId}', [CourseController::class, 'getAllCoursesByCategory']);
    Route::get('courses/{courseId}/ratings', [RatingController::class, 'getAllRatingsByCourseId']);

    //rating
    Route::get('ratings', [RatingController::class, 'getAllRatings']);
    Route::get('ratings/{id}', [RatingController::class, 'getRating']);
    Route::post('ratings/create', [RatingController::class, 'createRating']);
    Route::put('ratings/update/{id}', [RatingController::class, 'updateRating']);
    Route::delete('ratings/delete/{id}', [RatingController::class, 'deleteRating']);

//    //my list
//    Route::get('mylist', [RatingController::class, 'getAllRatings']);
//    Route::get('mylist/{id}', [RatingController::class, 'getRating']);
//    Route::post('mylist/create', [RatingController::class, 'createRating']);
//    Route::put('mylist/update/{id}', [RatingController::class, 'updateRating']);
//    Route::delete('mylist/delete/{id}', [RatingController::class, 'deleteRating']);

    //user
    Route::get('user', [UserController::class, 'getAll']);
    Route::get('user/findByUsername/{username}', [UserController::class, 'getByUsername']);
//    Route::post('user/create', [UserController::class, 'create']);
});

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('user/profile', [UserController::class, 'profile']);
    Route::post('user/logout', [UserController::class, 'logout']);
//    Route::post('category/create', [CategoryController::class, 'createCategory']);
    Route::post('courses/{id}/files', [CourseController::class, 'storeFile']);
});

Route::middleware(['jwt.auth', 'jwt.role:' . UserRole::INSTRUCTOR->value])->group(function () {
    Route::post('category/create', [CategoryController::class, 'createCategory']);
});
