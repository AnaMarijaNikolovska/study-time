<?php

namespace App\Enums;

enum UserRole: string
{
    case INSTRUCTOR = 'Instructor';
    case REGULAR_USER = 'Regular User';
}
