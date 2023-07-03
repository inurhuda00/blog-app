<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PermissionSeeder::class,
            CategorySeeder::class,
            TagSeeder::class,
            ArticleSeeder::class
        ]);

        $user = User::factory()->hasArticles(150)->create([
            'name' => 'Seorang Editor',
            'email' => 'editor@gmail.com',
            'username' => 'seorang_editor',
        ]);

        $user->assignRole('editor');


        $user = User::factory()->hasArticles(150)->create([
            'name' => 'Seorang Writer',
            'email' => 'writer@gmail.com',
            'username' => 'seorang_writer',
        ]);

        $user->assignRole('writer');
    }
}
