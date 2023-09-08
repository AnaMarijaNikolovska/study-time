<?php

namespace App\Enums;

enum GenderEnum: string
{
    case Male = 'Male';
    case Female = 'Female';
    case Other = 'Other';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
