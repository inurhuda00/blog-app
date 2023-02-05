<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class EditorController extends Controller
{
    public $tags;
    public $categories;
    public $statuses;


    public function __construct()
    {

        $this->tags = Tag::select('id', 'name')->get();
        $this->categories = Category::select('id', 'name')->get();
        $this->statuses = collect(ArticleStatus::cases())->map(fn ($status) => [
            'id' => $status->value,
            'name' => str($status->label())->ucfirst()
        ]);
    }

    public function editor(Request $request,  Article $article = null)
    {
        // kalau parameter tidak send 
        if (empty($article)) {
            return  "kosong";
        }

        return inertia('Editor', [
            'tags' => $this->tags,
            'categories' => $this->categories,
            'statuses' => $this->statuses,
            'can' => [
                'update_article' => $request->user() && empty($article) ? $request->user()->can('update', $article) : false
            ],
            'role' => 'admin',
            'article' => $article
        ]);
    }

    // public function store(ArticleRequest $request)
    // {

    //     $picture = $request->file('picture');

    //     $article = $request->user()->articles()->create([
    //         'title' => $title = $request->title,
    //         'slug' => $slug =  str($title)->slug(),
    //         'excerpt' => $request->excerpt,
    //         'category_id' => $request->category_id,
    //         'status' => $request->status,
    //         'body' => $request->body,
    //         'picture' => $request->hasFile('picture')
    //             ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension(), 'public')
    //             : null

    //     ]);

    //     $article->tags()->attach($request->tags);

    //     return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
    //         'type' => 'success',
    //         'message' => 'article created'
    //     ]);
    // }
}
