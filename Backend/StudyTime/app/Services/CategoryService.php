<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;

class CategoryService
{
    /**
     * constructor
     */
    public function __construct(private readonly CategoryRepository $categoryRepository)
    {
    }

    public function saveCategory(array $data): Category
    {
        return $this->categoryRepository->create($data);
    }

//    public function getCategories()
//    {
//        return $this->categoryRepository->all();
//    }
}
