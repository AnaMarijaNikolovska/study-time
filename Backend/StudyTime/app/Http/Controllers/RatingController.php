<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function __construct()
    {
        //
    }

    public function getAllRatings()
    {
        return Rating::all();
    }

    public function getRating($id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['error' => 'Rating not found'], 404);
        }

        return response()->json(compact('rating'));
    }

    public function createRating(Request $request) {

        $validated = $request->validate([
            "comment",
            "ratingStatus" => "required | string"
        ]);

        $rating = Rating::create($validated);
        return json_encode($rating);
    }

    public function updateRating(Request $request, $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['error' => 'Rating not found'], 404);
        }

        $validatedData = $request->validate([
            "comment"=> 'string',
            "ratingStatus" => "string"
        ]);

        $rating->update($validatedData);

        return response()->json(['message' => 'Rating updated successfully']);
    }

    public function deleteRating($id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['error' => 'Rating not found'], 404);
        }

        $rating->delete();

        return response()->json(['message' => 'Rating deleted successfully']);
    }
}
