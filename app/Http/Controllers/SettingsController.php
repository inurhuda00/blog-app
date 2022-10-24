<?php

namespace App\Http\Controllers;

use App\Enums\LinkType;
use App\Http\Resources\UserSingleResource;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class SettingsController extends Controller
{

    public function profile(Request $request)
    {

        $user = $request->user()->load('profile');

        return inertia('Settings/Profile', [
            'user' => new UserSingleResource($user),
            'linkTypes' => collect(LinkType::cases())->map(fn ($status, $i) => [
                'id' => $status->value,
                'name' => $status->value,
            ])
        ]);
    }

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

    public function updateProfile(Request $request)
    {

        $request->validate([
            'name' => ['required'],
            'username' => 'required|alpha_dash|min:5|unique:users,username,' . $request->user()->id,
            'bio' => ['nullable'],
        ]);


        $request->user()->update([
            'name' => $request->name,
            'username' => $request->username,
        ]);

        $request->user()->profile()->updateOrCreate([
            'bio' => $request->bio
        ]);

        return to_route('users.show', $request->user()->username)->with([
            'type' => 'success',
            'message' => 'profile updated'
        ]);
    }

    public function storeLink(Request $request)
    {
        if ($request->user()->profile->links->count() >= 3) {
            return back()->with([
                'type' => 'error',
                'message' => 'the link is maxed out'
            ]);
        }

        if ($request->name == LinkType::WEBSITE->value) {
            $request->validate([
                'name' => ['required', 'string', new Enum(LinkType::class)],
                'url' => ['required', 'string', 'url', 'active_url']
            ]);
        } else {
            $request->validate([
                'name' => ['required', new Enum(LinkType::class)],
                'url' => ['required', 'alpha_dash']
            ]);
        }



        $request->user()->profile->links()->create([
            'name' => $request->name,
            'url' => $request->url
        ]);

        return back()->with([
            'type' => 'success',
            'message' => 'created social link 🎁'
        ]);
    }

    public function destroyLink(Link $link)
    {
        $link->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'article deleted'
        ]);
    }
}
