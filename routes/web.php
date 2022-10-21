<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
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

// auth()->loginUsingId(1);

Route::get('dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::get('articles/table', [ArticleController::class, 'table'])->name('articles.table');

Route::get('', HomeController::class)->name('home');

Route::resource('articles', ArticleController::class);

Route::get('category/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');
Route::get('tags/{tag:slug}', [TagController::class, 'show'])->name('tags.show');

Route::middleware('auth')->group(function () {
    Route::get('settings/account', [SettingsController::class, 'account'])->name('settings.account');
    Route::post('settings/account', [SettingsController::class, 'updateAccount'])->name('settings.account.update');

    Route::get('settings/profile', [SettingsController::class, 'profile'])->name('settings.profile');
    Route::put('settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile.update');

    Route::post('links', [SettingsController::class, 'storeLink'])->name('links.store');
    Route::delete('links/{link}', [SettingsController::class, 'destroyLink'])->name('links.destroy');
});

Route::get('{user:username}', [UserController::class, 'show'])->name('users.show');
