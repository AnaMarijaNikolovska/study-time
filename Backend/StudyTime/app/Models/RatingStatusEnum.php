<?php

namespace App\Models;

enum RatingStatusEnum:string
{
case Bad='Bad';
case NotBad='NotBad';
case Good='Good';
case VeryGood='VeryGood';
case Perfect='Perfect';

}
