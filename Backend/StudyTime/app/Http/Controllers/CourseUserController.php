<?php

namespace App\Http\Controllers;

use App\Models\CourseUser;
use App\Models\User;

class CourseUserController extends Controller
{

    public function getAllUserCourses($userId)
    {
        $user = User::find($userId);
        $courses = $user->courses;

        return response()->json($courses);
    }

    // Attach a user to a course
    public function attachCourseToUser($userId, $courseId)
    {
        $user = User::find($userId);
        $user->courses()->attach($courseId);

        return response()->json(['message' => 'Course attached to user'], 200);
    }

    // Detach a user from a course
    public function detachCourseFromUser($userId, $courseId)
    {
        $user = User::find($userId);
        $user->courses()->detach($courseId);
        return response()->json(['message' => 'Course detached from user'], 200);
    }
}
