<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__ . '/auth.php';

// auth()->loginUsingId(2);

Route::get('dashboard', DashboardController::class)->middleware(['auth', 'verified', 'hasRole'])->name('dashboard');

Route::get('/', HomeController::class)->name('home');

Route::get('category/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('tags/{tag:slug}', [TagController::class, 'show'])->name('tags.show');

Route::middleware(['auth', 'hasRole'])->group(function () {
    Route::get('settings/account', [SettingsController::class, 'account'])->name('settings.account');
    Route::post('settings/account', [SettingsController::class, 'updateAccount'])->name('settings.account.update');

    Route::get('settings/profile', [UserProfileController::class, 'show'])->name('profile.show');
    Route::put('settings/profile', [UserProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile-photo', [UserProfileController::class, 'destroyPhoto'])->name('current-user-photo.destroy');

    Route::post('links', [LinkController::class, 'store'])->name('links.store');
    Route::delete('links/{link}', [LinkController::class, 'destroy'])->name('links.destroy');

    Route::controller(EditorController::class)->group(function () {
        Route::get('editor/{article?}', 'editor')->name('editor');
        Route::post('editor', 'store')->name('editor.store'); // draf 
        Route::post('editor/review', 'review')->name('editor.review'); // review 
        Route::post('editor/reject/{article:slug}', 'reject')->name('editor.reject'); // reject
        Route::post('editor/publish/{article:slug}', 'publish')->name('editor.publish'); // publish
        Route::post('editor/edit/{article:slug}', 'edit')->name('editor.edit'); // publish & edit
    });
});

Route::controller(ArticleController::class)->group(function () {
    Route::get('articles', 'index')->name('articles.index');
    Route::delete('article/{article}', 'destroy')->name('articles.destroy');
    Route::get('articles/table', 'table')->name('articles.table');

    Route::get('{user:username}/{article:slug}', 'show')->scopeBindings()->name('articles.show');
});

Route::get('{user:username}', [UserController::class, 'show'])->name('users.show');
