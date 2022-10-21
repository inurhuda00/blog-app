<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(5)->hasArticles(15)->create();

        Article::get()->each(function ($article) {
            $article->tags()->attach(
                Tag::get()->random(rand(1, 3))->pluck('id')
            );
        });
    }
}
