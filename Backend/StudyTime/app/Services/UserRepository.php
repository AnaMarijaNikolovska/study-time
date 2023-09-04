<?php

namespace App\Services;

class UserRepository
{
    /**
     * constructor
     */
    public function __construct(private readonly UserRepository $userRepository)
    {
    }
}
