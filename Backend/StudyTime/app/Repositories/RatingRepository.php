<?php

namespace App\Repositories;


use App\Models\Rating;

class RatingRepository extends BaseRepository
{
    public function __construct(Rating  $rating)
    {
        $this->model = $rating;
    }
}
