<?php

namespace App\Services;

use App\Models\Course;
use App\Repositories\CourseRepository;
use Illuminate\Database\Eloquent\Model;

class CourseService
{
    /**
     * constructor
     */
    public function __construct(private readonly CourseRepository $courseRepository)
    {
    }

    public function saveCourse(array $data): Course
    {
        return $this->courseRepository->create($data);
    }

    public function editCourse(int $id , array $data): bool
    {
        $course = $this->courseRepository->findOrFail($id);
        return $this->courseRepository->update($course, $data);
    }

}
