<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            ['name' => $name = 'Anekdot', 'slug' => str($name)->slug()],
            ['name' => $name = 'Fiksi Mini', 'slug' => str($name)->slug()],
            ['name' => $name = 'Esai', 'slug' => str($name)->slug()],
            ['name' => $name = 'Puisi', 'slug' => str($name)->slug()],
            ['name' => $name = 'Reportase', 'slug' => str($name)->slug()],
            ['name' => $name = 'Editorial', 'slug' => str($name)->slug()],
        ])->each(fn ($category) => Category::create($category));
    }
}
