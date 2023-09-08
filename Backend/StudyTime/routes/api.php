<?php

use App\Enums\UserRole;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseUserController;
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
Route::post('login', [UserController::class, 'login']);

Route::group(['middleware' => 'cors'], function () {
    //user
    Route::get('users', [UserController::class, 'getAll']);
    Route::get('users/{id}', [UserController::class, 'getUser']);
    Route::post('users/register', [UserController::class, 'register']);
    Route::post('/users/{userId}/courses', [CourseUserController::class, 'getAllUserCourses']);


    //category
    Route::get('category', [CategoryController::class, 'getAllCategories']);
    Route::get('category/{id}', [CategoryController::class, 'getCategory']);

    //course
    Route::get('courses', [CourseController::class, 'getAllCourses']);
    Route::get('courses/{id}', [CourseController::class, 'getCourse']);

    Route::get('courses/{id}/files', [CourseController::class, 'getFiles']);
    Route::get('courses/category/{categoryId}', [CourseController::class, 'getAllCoursesByCategory']);
    Route::get('courses/{courseId}/ratings', [RatingController::class, 'getAllRatingsByCourseId']);

    //rating
    Route::get('ratings', [RatingController::class, 'getAllRatings']);
    Route::get('ratings/{id}', [RatingController::class, 'getRating']);


//    //my list
//    Route::get('mylist', [RatingController::class, 'getAllRatings']);
//    Route::get('mylist/{id}', [RatingController::class, 'getRating']);
//    Route::post('mylist/create', [RatingController::class, 'createRating']);
//    Route::put('mylist/update/{id}', [RatingController::class, 'updateRating']);
//    Route::delete('mylist/delete/{id}', [RatingController::class, 'deleteRating']);
});

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('auth-user', [UserController::class, 'profile']);
    Route::post('users/logout', [UserController::class, 'logout']);

    Route::post('ratings/create', [RatingController::class, 'createRating']);
    Route::put('ratings/update/{id}', [RatingController::class, 'updateRating']);
    Route::delete('ratings/delete/{id}', [RatingController::class, 'deleteRating']);

    Route::post('/users/{userId}/courses/{courseId}', [CourseUserController::class, 'attachCourseToUser']);
    Route::delete('/users/{userId}/courses/{courseId}', [CourseUserController::class, 'detachCourseFromUser']);

    Route::middleware(['jwt.role:' . UserRole::INSTRUCTOR->value])->group(function () {
        Route::post('category/create', [CategoryController::class, 'createCategory']);
        Route::post('courses/{id}/files', [CourseController::class, 'storeFile']);
        Route::post('courses/create', [CourseController::class, 'createCourse']);
        Route::put('courses/update/{id}', [CourseController::class, 'updateCourse']);
        Route::delete('courses/delete/{id}', [CourseController::class, 'deleteCourse']);
        Route::put('category/update/{id}', [CategoryController::class, 'updateCategory']);
        Route::delete('category/delete/{id}', [CategoryController::class, 'deleteCategory']);
    });
});

