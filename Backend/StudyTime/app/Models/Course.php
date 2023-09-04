<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $primaryKey = "id";
    protected $fillable = ['name', 'description', 'category_id'];

    public function files()
    {
        return $this->hasMany(CourseFile::class);
    }
}