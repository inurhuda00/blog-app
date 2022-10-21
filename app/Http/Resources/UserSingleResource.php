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
        return  [
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'bio' => $this->profile->bio,
            'links' => $this->profile->links->map(fn ($link) => [
                'id' => $link->id,
                'name' => $link->name,
                'url' => $link->url,
            ]),
        ];
    }
}
