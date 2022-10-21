<?php

use App\Enums\LinkType;
use App\Models\Profile;
use App\Models\User;
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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('bio');
            $table->foreignIdFor(User::class);
        });

        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->default(LinkType::WEBSITE->value);
            $table->string('url', 100);
            $table->string('display', 25)->nullable();
            $table->foreignIdFor(Profile::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('links');
    }
};
