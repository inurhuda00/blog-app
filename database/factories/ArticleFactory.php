<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'category_id' => rand(1, 5),
            'user_id' => User::factory(),
            'title' => $title = $this->faker->sentence(),
            'slug' => str($title)->slug,
            'excerpt' => $this->faker->sentence(),
            'picture' => 'images/articles/' . rand(1, 10) . '.jpg',
            'body' => $this->faker->sentence(),
            'status' => $status = rand(0, 3),
            'published_at' => $status === 2 ? now() : null

        ];
    }
}
