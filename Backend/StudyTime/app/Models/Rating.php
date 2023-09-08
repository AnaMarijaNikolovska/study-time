<?php

namespace App\Models;

use App\Enums\RatingStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = ['comment', 'star', 'course_id', 'commenter_id'];
    protected $casts = [
        'star' => RatingStatusEnum::class
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function commenter()
    {
        return $this->belongsTo(User::class);
    }

}
