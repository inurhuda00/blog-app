<?php

namespace App\Models;

use App\Enums\ArticleStatus;
use App\Traits\UUID;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    use HasFactory;
    use UUID;


    protected $guarded = [];

    protected $with = ['author', 'tags', 'category'];

    protected $casts = [
        'status' => ArticleStatus::class,
        'published_at' => 'datetime'
    ];

    protected function body(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true),
            set: fn ($value) => json_encode($value),
        );
    }


    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getUrlAttribute()
    {
        return route('articles.show', [$this->author, $this->slug]);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->select('id', 'slug', 'name');
    }

    public function category()
    {
        return $this->belongsTo(Category::class)->select('id', 'slug', 'name');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'name', 'username', 'avatar');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id')->select('id', 'name', 'username', 'avatar');
    }

    public function scopePublished($query)
    {
        return $query->where('status', ArticleStatus::PUBLISHED)->whereNotNull('published_at')->whereDate('published_at', '<=', Carbon::now());
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
