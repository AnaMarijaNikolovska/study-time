<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $primaryKey = "id";
    protected $fillable = ['name', 'description', 'category_id', 'instructor_id'];

    public function files(): HasMany
    {
        return $this->hasMany(CourseFile::class);
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_user');
    }
}
