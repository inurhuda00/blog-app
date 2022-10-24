<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleItemResource;
use App\Models\Tag;

class TagController extends Controller
{
    public function show(Tag $tag)
    {
        $articles = $tag->articles()
            ->latest()
            ->fastPaginate();

        return Inertia('Tags/Show', [
            'tag' => $tag,
            'articles' => ArticleItemResource::collection($articles)
        ]);
    }
}
