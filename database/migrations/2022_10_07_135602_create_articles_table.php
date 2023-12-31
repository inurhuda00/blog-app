<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->uuid('uuid')->unique();
            $table->string('title');
            $table->string('picture')->nullable();
            $table->integer('status')->default(\App\Enums\ArticleStatus::DRAFT->value);
            $table->text('excerpt')->nullable();;
            $table->text('body');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('editor_id')->nullable()->constrained()->references('id')->on('users');
            $table->foreignId('category_id');
            $table->dateTime('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
