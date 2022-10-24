<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'body' => $this->body,
            'status' => $this->status,
            'author' => $this->author,
            'picture' => $this->picture ? env('APP_URL') . Storage::url($this->picture) : 'http://localhost/storage/images/articles/image.jpg',
            'time' => [
                'datetime' => $this->published_at,
                'published_at' => $this->published_at->format('Y') == now()->format('Y')
                    ? $this->published_at->format('F d , Y')
                    : $this->published_at->format('d M, Y'),
            ],
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug
            ],
            'tags' => $this->tags->map(fn ($tag) => [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug
            ])
        ];
    }
}
