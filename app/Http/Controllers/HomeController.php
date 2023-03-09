<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleItemResource;
use App\Models\Article;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        $articles = Article::query()
            ->select('slug', 'title', 'picture', 'excerpt', 'user_id', 'category_id', 'published_at', 'id')
            ->with(['category' => fn ($query) => $query->select('id', 'slug', 'name')])
            ->limit(9)
            ->published()
            ->get();

        return inertia('Home', [
            'articles' => ArticleItemResource::collection($articles)
        ]);
    }
}
