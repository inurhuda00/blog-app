<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Tiptap\Editor;

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
        $profile = $this->author->profile ? [
            'bio' =>  $this->author->profile->bio,
            'links' => $this->author->profile->links->map(fn ($link) => [
                'id' => $link->id,
                'name' => $link->name,
                'full_url' => $link->name->fullUrl($link->url),
            ])
        ] : [];

        $editor = (new Editor())->setContent($this->body);
        $body = $editor->descendants(function (&$node) {
            if ($node->type !== 'heading') {
                return;
            }

            if ($node->attrs->level == 1) {
                array_shift($node->content);
            }
        });
        $editor = $this->editor ? ['editor' => [
            'name' => $this->editor->name,
            'username' => $this->editor->username,
            'avatar' => $this->editor->avatar_url,
        ]] : [];

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'body' => $body->getHTML(),
            'status' => $this->status,
            'author' => [
                'name' => $this->author->name,
                'username' => $this->author->username,
                'avatar' => $this->author->avatar_url,
                ...$profile

            ],
            ...$editor,
            'picture' => $this->picture ? env('APP_URL') . Storage::url($this->picture) : env('APP_URL') . '/storage/images/articles/image.jpg',
            'time' => [
                'datetime' => $this->published_at ?? $this->created_at,
                'published_at' => $this->published_at ?
                    ($this->published_at->format('Y') == now()->format('Y')
                        ? $this->published_at->format('F d , Y')
                        : $this->published_at->format('d M, Y')) : ($this->created_at->format('Y') == now()->format('Y')
                        ? $this->created_at->format('F d , Y')
                        : $this->created_at->format('d M, Y')),
            ],
            'share' => (array)
            [
                [
                    'name' => 'link',
                    'uri' =>  $this->url,
                ],
                [
                    'name' => 'facebook',
                    'uri' => 'https://www.facebook.com/sharer/sharer.php?u=' . $this->url,
                ],
                [
                    'name' => 'twitter',
                    'uri' => 'https://twitter.com/intent/tweet' . '?text=' . urlencode($this->title) . '&url=' . $this->url,
                ],
                [
                    'name' => 'linkedin',
                    'uri' => 'https://www.linkedin.com/sharing/share-offsite' . '?mini=true' . '&url=' . $this->url . '&title=' . urlencode($this->title) . '&summary=' . urlencode($this->excerpt),
                ],
                [
                    'name' => 'whatsapp',
                    'uri' => 'https://wa.me/?text=' . $this->url,
                ],
                [
                    'name' => 'telegram',
                    'uri' => 'https://telegram.me/share/url' . '?url=' . $this->url . '&text=' . urlencode($this->title),
                ],
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
