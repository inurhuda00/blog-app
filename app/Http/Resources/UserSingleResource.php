<?php

namespace App\Http\Resources;

use App\Enums\LinkType;
use Illuminate\Http\Resources\Json\JsonResource;

class UserSingleResource extends JsonResource
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
                'display' => $link->display
            ])
        ] : [];

        return  [
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            ...$profile
        ];
    }
}
