<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleSingleResource;
use App\Http\Resources\EditorResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;
use Tiptap\Editor;

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

    public function editor(Request $request,  Article $article)
    {

        if ($article->exists) {
            $this->authorize('update', $article);

            $article = $article->load([
                'category'
            ]);
        }

        $this->authorize('create', $article);

        return inertia('Editor', [
            'tags' => $this->tags,
            'categories' => $this->categories,
            'statuses' => $this->statuses,
            'can' => [
                'createArticles' => $request->user()->can('create or delete articles', $article),
                'acceptOrRejectArticle' => $article->exists ? $request->user()->can('accept or reject articles', $article) : false,
                'manageArticles' => $request->user()->can('manage articles', $article),
                'editAnyArticles' => $request->user()->can('edit any articles', $article)
            ],
            'article' => new EditorResource($article)

        ]);
    }

    public function store(ArticleRequest $request)
    {


        $body = (new Editor)->sanitize($request->body);


        $article = $request->user()->articles()->create([
            'title' => $title = $request->title,
            'slug' => $slug =  str($title)->slug(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'body' => (new Editor())->setContent($body)->getJSON(),
        ]);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'article created'
        ]);
    }

    public function review(ArticleRequest $request)
    {

        $picture = $request->file('picture');

        // $picture = $request->file('picture');
        $body = (new Editor)->sanitize($request->body);

        $article = $request->user()->articles()->create([
            'title' => $title = $request->title,
            'slug' => $slug =  str($title)->slug(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => ArticleStatus::REVIEW->value,
            'body' => $body,
            'picture' => $request->hasFile('picture')
                ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension(), 'public')
                : null
        ]);

        collect($request->tags)->unique()->each(function ($tag) use ($article) {
            $tag = Tag::firstOrCreate(
                ['slug' => Str::slug($tag)],
                ["name" => $tag]
            );
            $article->tags()->attach($tag);
        });

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'article created'
        ]);
    }

    public function reject(ArticleRequest $request, Article $article)
    {

        $article->update([
            'status' => ArticleStatus::REJECTED->value,
        ]);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'article rejected'
        ]);
    }

    public function publish(ArticleRequest $request, Article $article)
    {
        $picture = $request->file('picture');

        $body = (new Editor)->sanitize($request->body);

        $article->update([
            'title' => $title = $request->title,
            'slug' => $slug =  str($title)->slug(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => ArticleStatus::PUBLISHED->value,
            'body' => (new Editor())->setContent($body)->getJSON(),
            'published_at' => now(),
            'picture' => $request->hasFile('picture')
                ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension(), 'public')
                : null,
            'editor_id' => $request->user()->id
        ]);

        collect($request->tags)->unique()->each(function ($tag) use ($article) {
            $tag = Tag::firstOrCreate(
                ['slug' => Str::slug($tag)],
                ["name" => $tag]
            );
            $article->tags()->syncWithoutDetaching($tag);
        });

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'article published'
        ]);
    }
    public function edit(ArticleRequest $request, Article $article)
    {
        $picture = $request->file('picture');

        $body = (new Editor)->sanitize($request->body);

        $article->update([
            'title' => $title = $request->title,
            'slug' => $slug =  str($title)->slug(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => ArticleStatus::PUBLISHED->value,
            'body' => (new Editor())->setContent($body)->getJSON(),
            'picture' => $request->hasFile('picture')
                ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension(), 'public')
                : null
        ]);

        collect($request->tags)->unique()->each(function ($tag) use ($article) {
            $tag = Tag::firstOrCreate(
                ['slug' => Str::slug($tag)],
                ["name" => $tag]
            );
            $article->tags()->syncWithoutDetaching($tag);
        });

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'article edited'
        ]);
    }
}
