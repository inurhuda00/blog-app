<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
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

        // User::factory()->create([
        //     'name' => 'Ilham Nuruddin Al Huda',
        //     'email' => 'inurhuda00@gmail.com',
        //     'username' => 'inurhuda00',
        // ]);

        $this->call([
            CategorySeeder::class,
            TagSeeder::class,
            ArticleSeeder::class
        ]);
    }
}
