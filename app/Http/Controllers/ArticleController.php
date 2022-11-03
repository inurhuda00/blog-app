<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleItemResource;
use App\Http\Resources\ArticleSingleResource;
use App\Http\Resources\ArticleTableCollection;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public $tags;
    public $categories;
    public $statuses;

    public function __construct()
    {
        $this->authorizeResource(Article::class, 'article');
        $this->middleware('auth')->except('show', 'index');
        $this->middleware('hasRole')->only('table', 'create');

        $this->tags = Tag::select('id', 'name')->get();
        $this->categories = Category::select('id', 'name')->get();
        $this->statuses = collect(ArticleStatus::cases())->map(fn ($status) => [
            'id' => $status->value,
            'name' => str($status->label())->ucfirst()
        ]);
    }

    public function table(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'direction' => ['in:asc,desc'],
            'field' => ['in:title,status'],
            'load' => ['int'],
            'q' => ['string'],
        ]);

        $direction = $request->direction;
        $field = $request->field;
        $load = $request->load;

        if ($validator->errors()->get('direction')) {
            $direction = 'asc';
        }
        if ($validator->errors()->get('field')) {
            $field = 'title';
        }

        if ($validator->errors()->get('load')) {
            $load = '5';
        }

        $articles = Article::query()
            ->with([
                'author',
                'tags' => fn ($query) => $query->select('name', 'slug', 'id'),
                'category' => fn ($query) => $query->select('name', 'slug', 'id')
            ])
            ->whereBelongsTo($request->user(), 'author')
            ->when(
                $request->user()->hasRole('admin'),
                fn ($query) => $query->whereBelongsTo($request->user(), 'author')
            )
            ->when(
                $request->q,
                fn ($query) =>
                $query
                    ->where('title', 'like', '%' . $request->q . '%')
                // ->orWhereHas('author', fn ($query) => $query->where('name', 'like', '%' . $request->q . '%'))
            )
            ->when(
                $request->has(['field', 'direction']),
                fn ($query) =>
                $query->orderBy($field, $direction)
            )
            ->fastPaginate($load <= 50 ? $load ?? 5 : 5);

        return inertia(
            'Articles/Table',
            ['articles' => new ArticleTableCollection($articles)]
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
            ->select('slug', 'title', 'picture', 'excerpt', 'user_id', 'category_id', 'published_at', 'id')
            ->with([
                'tags' => fn ($query) => $query->select('slug', 'name'),
                'author'
            ])
            ->published()
            ->latest()
            ->fastPaginate();

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

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
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
    public function show(Request $request, User $user, Article $article)
    {
        $currentArticle = $article->load([
            'tags' => fn ($query) => $query->select('name', 'slug'),
            'category' => fn ($query) => $query->select('id', 'name', 'slug'),
            'author' => fn ($query) => $query->select('id', 'name', 'username', 'avatar')

        ]);

        $articles = Article::query()
            ->select('title', 'slug', 'user_id', 'category_id', 'published_at')
            ->with([
                'author' => fn ($query) => $query->select('id', 'name', 'username', 'avatar'),
                'category' => fn ($query) => $query->select('id', 'name', 'slug'),
            ])
            ->whereNot('slug', $article->slug)
            ->whereBelongsTo($article->category)
            ->published()
            ->limit(10)
            ->get();

        return inertia('Articles/Show', [
            'can' => [
                'update_article' => $request->user() ? $request->user()->can('update', $article) : false
            ],
            'article' => (new ArticleSingleResource($currentArticle))->additional([
                'related' => ArticleItemResource::collection($articles),
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
            'status' => $status = intval($request->status),
            'published_at' => $status == ArticleStatus::PUBLISHED->value ? now() : null,
            'body' => $request->body,
            'picture' => $request->hasFile('picture')
                ? $picture->storeAs('images/articles', $slug . '.' . $picture->extension(), 'public')
                : $article->picture

        ]);

        $article->tags()->sync($request->tags, true);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
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
