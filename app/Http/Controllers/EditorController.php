<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\EditorResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tiptap\Editor;
use Spatie\Image\Image;
use Spatie\Image\Manipulations;

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
        $this->authorize('create', $article);

        if ($article->exists) {
            $this->authorize('update', $article);

            $article = $article->load([
                'category'
            ]);
        }


        $statuses = $request->user()->canany(['edit any articles', 'manage articles']) ?  ['statuses' => $this->statuses] : [];
        $status = $article->exists ? ['is' => [
            'draft' => ArticleStatus::DRAFT->equals($article->status),
            'review' => ArticleStatus::REVIEW->equals($article->status),
            'published' => ArticleStatus::PUBLISHED->equals($article->status),
            'rejected' => ArticleStatus::REJECTED->equals($article->status),
        ], 'status' => $article->status->label()] : [
            'is' => [
                'draft' => true,
            ],
            'status' => 'draft'
        ];

        return inertia('Editor', [
            'categories' => $this->categories,
            'can' => [
                'createArticles' => $request->user()->can('create or delete articles', $article),
                'acceptOrRejectArticle' => $article->exists ? $request->user()->can('accept or reject articles', $article) : false,
                'manageArticles' => $request->user()->can('manage articles', $article),
                'editAnyArticles' => $request->user()->can('edit any articles', $article)
            ],
            'article' => new EditorResource($article),
            ...$status,
            ...$statuses
        ]);
    }

    public function store(ArticleRequest $request)
    {
        $this->authorize('create', Article::class);

        $body = $this->sanitize($request->body);

        $picture = $request->hasFile('picture') ? $this->convertImageWebp($request->file('picture'), $request->title) : null;

        $article = $request->user()->articles()->create([
            'title' => $request->title,
            'slug' => str($request->title)->slug() . ' ' . uniqid(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'picture' => $picture,
            'status' => $request->status,
            'body' => (new Editor())->setContent($body)->getJSON(),
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
            'message' => 'article created'
        ]);
    }

    public function review(ArticleRequest $request)
    {
        $this->authorize('create', Article::class);

        $body = (new Editor)->sanitize($request->body);

        $article = $request->user()->articles()->create([
            'title' => $request->title,
            'slug' => str($request->title)->slug() . ' ' . uniqid(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => ArticleStatus::REVIEW->value,
            'body' => $body,
            'picture' => $request->hasFile('picture')
                ? $this->convertImageWebp($request->file('picture'))
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

    public function reject(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $article->update([
            'status' => ArticleStatus::REJECTED->value,
        ]);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'article rejected'
        ]);
    }

    public function publish(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $this->validate($request, [
            'picture' => ['required', 'mimes:png,jpg,jpeg,webp', 'image'],
            'title' => ['required', 'string', 'min:3'],
            'excerpt' => ['required', 'string', 'min:3'],
            'category_id' => ['required', 'exists:categories,id'],
            'body' => ['required'],
            'tags' => ['required', 'array'],
            'published_at' => ['required']
        ]);

        $body = (new Editor)->sanitize($request->body);

        $article->update([
            'title' => $request->title,
            'slug' => str($request->title)->slug() . ' ' . uniqid(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => ArticleStatus::PUBLISHED->value,
            'body' => (new Editor())->setContent($body)->getJSON(),
            'published_at' => Carbon::create($request->published_at['startDate'])->setTimeFromTimeString('11:53:20'),
            'picture' => $request->hasFile('picture')
                ? $this->convertImageWebp($request->file('picture'))
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

    public function edit(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $this->validate($request, [
            'picture' => ['required', 'mimes:png,jpg,jpeg,webp', 'image'],
            'title' => ['required', 'string', 'min:3'],
            'excerpt' => ['required', 'string', 'min:3'],
            'category_id' => ['required', 'exists:categories,id'],
            'body' => ['required'],
            'tags' => ['required', 'array'],
            'status' => ['required'],

        ]);

        $status = ArticleStatus::tryFrom($request->status);
        $published_at = $request->published_at;

        $published_at = $status === ArticleStatus::PUBLISHED && $request->has('published_at')
            ? now()
            : null;


        $body = $this->sanitize($request->body);

        $picture = null;

        if ($request->hasFile('picture')) {
            Storage::delete('public/' . $article->picture);
            $picture = $this->convertImageWebp($request->file('picture'));
        }

        $article->update([
            'title' => $request->title,
            'slug' => str($request->title)->slug() . ' ' . uniqid(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => $status,
            'body' => (new Editor())->setContent($body)->getJSON(),
            'published_at' => !$request->has('published_at') ? Carbon::create($request->published_at['startDate'])->setTimeFromTimeString('11:53:20') : $published_at,
            'picture' => $picture
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

    private function sanitize($body)
    {
        return (new Editor())->sanitize($body);
    }

    private function convertImageWebp($image, $title = null)
    {
        $filename = is_null($title)
            ? pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)
            : str($title)->slug();

        $changeExtensionToWebp = str($filename . " " .  uniqid())->slug() . '.webp';

        Image::load($image)
            ->format(Manipulations::FORMAT_WEBP)
            ->optimize()
            ->save(storage_path('app/public/' . $changeExtensionToWebp));

        return $changeExtensionToWebp;
    }
}
