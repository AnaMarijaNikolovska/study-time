<?php

namespace App\Enums;

enum RatingStatusEnum: string
{
    case None = 'None';
    case Bad = 'Bad';
    case NotBad = 'NotBad';
    case Good = 'Good';
    case VeryGood = 'VeryGood';
    case Perfect = 'Perfect';
}
