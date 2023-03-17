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
use Illuminate\Http\Response;
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

    public function editor(Request $request,  $uuid)
    {

        $validator = validator($request->route()->parameters(), [
            'uuid' => 'uuid'
        ]);

        abort_if($validator->fails(), Response::HTTP_UNAUTHORIZED);

        $article = Article::where('uuid', $uuid)->firstOr(function ($article) use ($request, $uuid) {
            return $request->user()->articles()->firstOrCreate(['uuid' => $uuid], [
                'title' => $title = 'Default Title ',
                'slug' => str($title)->slug() . ' ' . uniqid(),
                'status' => ArticleStatus::DRAFT->value,
                'category_id' => rand(1, 5),
                'body' => $this->sanitize('<h1>' . $title . '</h1><p>default content</p>'),
            ]);
        });

        $article = $article->load([
            'category'
        ]);

        $this->authorize('update', $article);

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


    public function store(ArticleRequest $request, Article $article)
    {
        $this->authorize('create', Article::class);

        $this->updateArticleWithStatus($request, $article, ArticleStatus::DRAFT);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'artikel disimpan ke draft'
        ]);
    }

    public function review(ArticleRequest $request, Article $article)
    {
        $this->authorize('create', Article::class);

        $this->updateArticleWithStatus($request, $article, ArticleStatus::REVIEW);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'artikel sukses dikirimkan untuk di tinjau'
        ]);
    }

    public function reject(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $this->updateArticleWithStatus($request, $article, ArticleStatus::REJECTED);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'artikel ditolak oleh anda'
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

        $this->updateArticleWithStatus($request, $article, ArticleStatus::PUBLISHED, ['editor_id' => $request->user()->id]);

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'Yeey! artikel sudah di publish'
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

        $this->updateArticleWithStatus($request, $article, ArticleStatus::from($request->status));

        return to_route('articles.show', ['user' => $article->author, 'article' => $article])->with([
            'type' => 'success',
            'message' => 'berhasil mengedit artikel'
        ]);
    }

    private function updateArticleWithStatus(Request $request, Article $article, ArticleStatus $status, $other = [])
    {
        if ($request->hasFile('picture')) {
            Storage::delete('public/' . $article->picture);
            $picture = $this->convertImageWebp($request->file('picture'), $request->title);
        }

        $article->update([
            'title' => $request->title,
            'slug' => str($request->title . ' ' . uniqid())->slug(),
            'excerpt' => $request->excerpt,
            'category_id' => $request->category_id,
            'status' => $status,
            'body' => $this->sanitize($request->body),
            'published_at' => $request->has('published_at') ? Carbon::create($request->published_at['startDate']) : Carbon::now(),
            'picture' => $picture,
            ...$other
        ]);


        collect($request->tags)->unique()->each(function ($tag) use ($article) {
            $tag = Tag::firstOrCreate(
                ['slug' => Str::slug($tag)],
                ["name" => $tag]
            );
            $article->tags()->syncWithoutDetaching($tag);
        });
    }

    private function sanitize($body)
    {
        $editor = new Editor();
        $body = $editor->sanitize($body);
        return $editor->setContent($body)->getJSON();
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
