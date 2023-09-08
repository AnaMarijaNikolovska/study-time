<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends ApiController
{
    public function __construct()
    {
    }

    public function getAll()
    {
        return User::all();
    }

    public function register(Request $data)
    {
        $validated = $data->validate([
            "name" => 'required|string',
            "surname" => 'required|string',
            "email" => "required|string",
            "password" => "required|string",
            "role" => "required|string",
            "gender" => "string",
        ]);

        return User::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'role' => $validated['role'],
            'gender' => $validated['gender'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
    }

    public function getUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');


        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = JWTAuth::user();

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function profile()
    {
        try {
            // Attempt to authenticate the user based on the token in the request
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to authenticate'], 401);
        }

        // User is authenticated, return their profile data
        return response()->json(compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
