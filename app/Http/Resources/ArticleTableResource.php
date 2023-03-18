<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleTableResource extends JsonResource
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
            'title' => $this->title,
            'uuid' => $this->uuid,
            'url' => route('articles.show', ['user' => $this->author, $this->slug]),
            'slug' => $this->slug,
            'author' => $this->author,
            'status' => $this->status->label(),
            'category' => [
                'name' => $this->category->name,
                'slug' => route('categories.show', $this->category)
            ],
            'tags' => $this->tags->map(fn ($tag) => [
                'name' => $tag->name,
                'url' => route('tags.show', $tag)
            ]),

        ];
    }
}
