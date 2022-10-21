<?php

namespace App\Http\Controllers;

use App\Enums\LinkType;
use App\Http\Resources\UserSingleResource;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

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
            'user' => new UserSingleResource($user),
            'linkTypes' => collect(LinkType::cases())->map(fn ($status, $i) => [
                'id' => $status->value,
                'name' => $status->value,
            ])
        ]);
    }

    public function updateAccount(Request $request)
    {
        return $request;
    }

    public function updateProfile(Request $request)
    {

        $request->validate([
            'name' => ['required'],
            'username' => 'required|alpha_dash|min:5|unique:users,username,' . $request->user()->id,
            'bio' => ['required'],
        ]);


        $request->user()->update([
            'name' => $request->name,
            'username' => $request->username,
        ]);

        $request->user()->profile()->update([
            'bio' => $request->bio
        ]);

        return to_route('users.show', $request->user()->username)->with([
            'type' => 'success',
            'message' => 'article updated'
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

        $request->validate([
            'link.name' => ['required', 'string'],
            'link.url' => ['required', 'string'],
        ]);

        $request->user()->profile->links()->create([
            'name' => $request->link['name'],
            'url' => $request->link['url']
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
