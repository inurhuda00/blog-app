<?php

namespace App\Http\Controllers;

use App\Enums\LinkType;
use App\Http\Resources\UserSingleResource;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class SettingsController extends Controller
{

    public function account(Request $request)
    {
        $user = $request->user()->load('profile');
        return inertia('Settings/Account', [
            'token' => app('auth.password.broker')->createToken($user),
            'user' => new UserSingleResource($user),
            'linkTypes' => collect(LinkType::cases())->map(fn ($status, $i) => [
                'id' => $status->value,
                'name' => $status->value,
            ])
        ]);
    }
}
