<?php

namespace App\Models;

use App\Enums\ArticleStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;


    protected $guarded = [];

    protected $with = ['author', 'tags'];

    protected $casts = [
        'status' => ArticleStatus::class
    ];


    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->select('slug', 'name');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'name', 'username');
    }

    public function scopePublished($query)
    {
        return $query->where('status', ArticleStatus::PUBLISHED);
    }

    public function scopeStatus($query, ArticleStatus $status)
    {
        return $query->where('visibility', $status);
    }

    public function scopeNext($query)
    {
        return $query->where('id', '>', $this->id)->with('user')->orderBy('id', 'asc');
    }

    public function scopePrevious($query)
    {
        return $query->where('id', '<', $this->id)->with('user')->orderBy('id', 'desc');
    }
}
