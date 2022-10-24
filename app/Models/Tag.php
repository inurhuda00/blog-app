<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    public function articles()
    {
        return $this->belongsToMany(Article::class)
            ->select('slug', 'title', 'picture', 'excerpt', 'user_id', 'published_at', 'id')
            ->with(['tags' => fn ($query) => $query->select('slug', 'name')])
            ->published()
            ->latest();
    }
}
