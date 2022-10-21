<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $profile = $this->profile ? [
            'bio' =>  $this->profile->bio,
            'links' => $this->profile->links->map(fn ($link) => [
                'id' => $link->id,
                'name' => $link->name,
                'full_url' => $link->name->fullUrl($link->url),
            ])
        ] : [];

        return  [
            'name' => $this->name,
            'username' => $this->username,
            'joined' => $this->created_at->diffForHumans(),
            ...$profile,

        ];
    }
}
