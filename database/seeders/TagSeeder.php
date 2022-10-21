<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            ['name' => $name = 'Fiksi', 'slug' => str($name)->slug()],
            ['name' => $name = 'Women', 'slug' => str($name)->slug()],
            ['name' => $name = 'Menepi', 'slug' => str($name)->slug()],
        ])->each(fn ($category) => Tag::create($category));
    }
}
