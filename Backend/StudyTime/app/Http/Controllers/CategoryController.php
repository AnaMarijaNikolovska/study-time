<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct()
    {
        //
    }

    public function getAllCategories()
    {
        return Category::all();
    }

    public function getCategory($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        return response()->json(compact('category'));
    }

    public function createCategory(Request $request):void
    {
        $validated = $request->validate([
            "name" => 'required|string',
            "description" => "string"
        ]);

      $category=  Category::create($validated);
//        return json_encode($category);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $validatedData = $request->validate([
            "name" => 'string',
            "description" => 'string'
        ]);

        $category->update($validatedData);

        return response()->json(['message' => 'Category updated successfully']);
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

}
