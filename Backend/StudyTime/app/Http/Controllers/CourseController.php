<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use ZipArchive;

class CourseController extends ApiController
{
    public function __construct()
    {
        //
    }

    public function getAllCourses()
    {
        return Course::all();
    }

    public function getCourse($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        return response()->json($course);
    }

    public function createCourse(Request $request)
    {

        $validated = $request->validate([
            "name" => 'required|string',
            "description" => "required",
            "category_id" => "required|int"
        ]);

        $course = Course::create($validated);
        return json_encode($course);
    }

    public function updateCourse(Request $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        $validatedData = $request->validate([
            "name" => 'string',
            "description",
            "category_id" => "int"
        ]);

        $course->update($validatedData);

        return response()->json(['message' => 'Course updated successfully']);
    }

    public function deleteCourse($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }

        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }

    public function storeFile(Request $request, $courseId)
    {
        $request->validate([
            'file' => 'required|mimes:pdf,doc,docx,jpg,jpeg,png,mp4', // Add more allowed file types as needed
            // Add other validation rules for your form fields
        ]);

        $course = Course::findOrFail($courseId);

        $fileType = $request->file('file')->extension();
        $filePath = $request->file('file')->store('files', 'public');

        $course->files()->create([
            'name' => $request->input('name') ?? 'test',
            'path' => $filePath,
            'type' => $fileType,
            'description' => '',
        ]);

        return response()->json(['message' => 'File uploaded successfully'], 201);
    }

    public function getFiles($courseId)
    {
        $course = Course::findOrFail($courseId);
        $filePaths = [];

        foreach ($course->files as $file) {
            $filePaths[] = storage_path('app/public/' . $file->path); // Adjust the path property based on your file model structure
        }

        // Create a temporary ZIP archive
        $zipPath = storage_path('app/temp/files.zip');
        $zip = new ZipArchive();

        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            foreach ($filePaths as $filePath) {
                if (File::exists($filePath)) {
                    $fileInfo = pathinfo($filePath);
                    $zip->addFile($filePath, $fileInfo['basename']);
                }
            }
            $zip->close();

            if (file_exists($zipPath)) {
                // Create a BinaryFileResponse
                $response = new BinaryFileResponse($zipPath);

                // Set the appropriate headers
                $response->headers->set('Content-Type', 'application/zip');
                $response->headers->set('Content-Disposition', 'attachment; filename="files.zip"');

                return $response;
            } else {
                // Handle the case where the ZIP archive couldn't be found
                return response('ZIP archive not found', 404);
            }
        } else {
            // Handle the case where the ZIP archive couldn't be created
            return response('Failed to create ZIP archive', 500);
        }
    }
}
