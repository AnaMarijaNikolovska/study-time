<?php

namespace App\Services;

use App\Repositories\RatingRepository;

class RatingService
{
    /**
     * constructor
     */
    public function __construct(private readonly RatingRepository $ratingRepository)
    {
    }
}
