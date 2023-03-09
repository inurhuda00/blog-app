<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Tiptap\Editor;

class EditorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return $this->exists ? [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'body' => (new Editor())->setContent($this->body)->getHTML(),
            'status' => $this->status->value,
            'author' => [
                'name' => $this->author->name,
                'username' => $this->author->username,
                'avatar' => $this->author->avatar_url,

            ],
            'picture' => $this->picture ? env('APP_URL') . Storage::url($this->picture) : env('APP_URL') . '/storage/images/articles/image.jpg',

            'category_id' => $this->category->id,
            'tags' => collect($this->tags)->pluck('name')
        ] : [];
    }
}
