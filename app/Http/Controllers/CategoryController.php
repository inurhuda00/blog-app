<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleItemResource;
use App\Models\Article;
use App\Models\Category;

class CategoryController extends Controller
{
    public function show(Category $category)
    {
        $articles = Article::query()
            ->orWhereBelongsTo($category)
            ->select('slug', 'title', 'picture', 'excerpt', 'user_id', 'category_id', 'published_at', 'id')
            ->published()
            ->latest()
            ->fastPaginate();

        return inertia('Categories/Show', [
            'category' => $category,
            'articles' => ArticleItemResource::collection($articles)
        ]);
    }
}
