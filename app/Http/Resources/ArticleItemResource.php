<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isEmpty;

class ArticleItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $excerpt = $this->excerpt ? ['excerpt' => $this->excerpt] : [];
        $tags = count($this->tags) ? [
            'tags' => $this->tags->map(fn ($tag) => [
                'name' => $tag->name,
                'slug' => $tag->slug,
            ])
        ] : [];
        $category = $this->category ? [
            'category' => [
                'name' => $this->category->name,
                'slug' => $this->category->slug
            ]
        ] : [];
        $author = $this->author ? [
            'author' => [
                'name' => $this->author->name,
                'username' => $this->author->username,
                'avatar' => $this->author->avatar_url,

            ]
        ] : [];


        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'picture' => $this->picture ? Storage::url($this->picture) : env('APP_URL') . '/storage/images/articles/image.jpg',
            'time' => [
                'datetime' => $this->published_at,
                'published_at' => $this->published_at->format('M d , Y'),
            ],
            ...$excerpt,
            ...$author,
            ...$tags,
            ...$category,
        ];
    }
}
