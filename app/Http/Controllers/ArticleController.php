<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleItemResource;
use App\Http\Resources\ArticleSingleResource;
use App\Http\Resources\ArticleTableResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{

    public $tags;
    public $categories;
    public $statuses;

    public function __construct()
    {
        $this->middleware('auth')->except('show', 'index');
        $this->tags = Tag::select('id', 'name')->get();
        $this->categories = Category::select('id', 'name')->get();
        $this->statuses = collect(ArticleStatus::cases())->map(fn ($status) => [
            'id' => $status->value,
            'name' => str($status->label())->ucfirst()
        ]);
    }

    public function table(Request $request)
    {
        $articles = Article::query()
            ->with([
                'author',
                'tags' => fn ($query) => $query->select('name', 'slug', 'id'),
                'category' => fn ($query) => $query->select('name', 'slug', 'id')
            ])
            ->whereBelongsTo($request->user(), 'author')
            // ->when(
            //     // $request->user() is not admin
            // , fn($query) => $query->whereBelongsTo($request->user(), 'author')
            // )
            ->latest()
            ->fastPaginate(10);

        return inertia(
            'Articles/Table',
            ['articles' => ArticleTableResource::collection($articles)]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::query()
            ->select('slug', 'title', 'excerpt', 'user_id', 'created_at', 'id')
            ->with([
                'tags' => fn ($query) => $query->select('slug', 'name'),
                'author'
            ])
            ->published()
            ->latest()
            ->fastPaginate();

        // return ArticleItemResource::collection($articles);

        return inertia('Articles/Index', [
            'articles' => ArticleItemResource::collection($articles)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Articles/Create', [
            'tags' => $this->tags,
            'categories' => $this->categories,
            'statuses' => $this->statuses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArticleRequest $request)
    {

        $picture = $request->file('picture');

        $article = $request->user()->articles()->create([
            'title' => $title = $request->title,
            'slug' => $slug =  str($title)->slug(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'body' => $request->body,
            'picture' => $request->hasFile('picture')
                ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension(), 'public')
                : null

        ]);

        $article->tags()->attach($request->tags);

        return to_route('articles.show', $article)->with([
            'type' => 'success',
            'message' => 'article created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $this->authorize('view', $article);


        $currentArticle = $article->load([
            'tags' => fn ($query) => $query->select('name', 'slug'),
            'category' => fn ($query) => $query->select('id', 'name',    'slug'),
            'author' => fn ($query) => $query->select('id', 'name',    'username')

        ]);


        $articles = Article::query()
            ->select('id', 'title', 'slug')
            ->whereNot('id', $article->id)
            ->whereBelongsTo($article->category)
            ->limit(10)
            ->get();

        return inertia('Articles/Show', [
            'article' => (new ArticleSingleResource($currentArticle))->additional([
                'related' => $articles
            ])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        $article = $article->load([
            'category'
        ]);

        return inertia('Articles/Edit', [
            'article' => new ArticleSingleResource($article),
            'tags' => $this->tags,
            'categories' => $this->categories,
            'statuses' => $this->statuses
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(ArticleRequest $request, Article $article)
    {

        $picture = $request->file('picture');


        $article->update([
            'title' => $title = $request->title,
            'slug' => $slug =  str($title)->slug(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'body' => $request->body,
            'picture' => $request->hasFile('picture')
                ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension(), 'public')
                : $article->picture

        ]);

        $article->tags()->sync($request->tags, true);

        return to_route('articles.show', $article)->with([
            'type' => 'success',
            'message' => 'article updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        if ($article->picture) {
            Storage::delete($article->picture);
        }

        $article->tags()->detach();
        $article->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'article deleted'
        ]);
    }
}
