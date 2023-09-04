<?php

namespace App\Repositories;

class UserRepository extends BaseRepository
{
    public function __construct(User  $user)
    {
        $this->model = $user;
    }
}
