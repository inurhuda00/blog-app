<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;
use Spatie\Permission\Models\Role;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed[]
     */
    public function share(Request $request)
    {
        // cache()->forget('categories_global');

        $categoriesGlobal = Category::query()
            ->whereHas('articles')
            ->select('name', 'slug')
            ->get();

        $roles = $request->user() ? $request->user()->roles()->get()->pluck('name') : null;

        $user = !is_null($request->user()) ? [
            'user' =>
            [
                ...$request->user()->only(['id', 'name', 'username', 'email']),
                'hasRole' => $request->user()->hasAnyRole(Role::all()),
                ...$roles = $roles->contains(fn ($value, $key) => in_array($value, ['editor', 'admin'])) ? ['roles' => $roles] : [],
                'avatar' => $request->user()->avatar_url,
                'password' => !$request->user()->password
            ]
        ] : [];


        return array_merge(parent::share($request), [
            'auth' => [...$user],
            'flash' => [
                'type' => $request->session()->get('type'),
                'message' => $request->session()->get('message'),

            ],
            'uuid' => Str::uuid(),
            'categories_global' => cache()->rememberForever('categories_global', fn () => $categoriesGlobal),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
