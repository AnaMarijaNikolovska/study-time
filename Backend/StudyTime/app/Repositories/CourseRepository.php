<?php

namespace App\Repositories;

use App\Models\Course;

class CourseRepository extends BaseRepository
{
    public function __construct(Course  $course)
    {
        $this->model = $course;
    }
}
