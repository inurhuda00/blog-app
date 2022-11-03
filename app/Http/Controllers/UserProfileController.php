<?php

namespace App\Http\Controllers;

use App\Enums\LinkType;
use App\Http\Resources\UserSingleResource;
use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $user = $request->user()->load('profile');

        return Inertia('Settings/Profile', [
            'user' => new UserSingleResource($user),
            'linkTypes' => collect(LinkType::cases())->map(
                fn ($status, $i) => [
                    'id' => $status->value,
                    'name' => $status->value,
                ],
            ),
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'username' => 'required|alpha_dash|min:5|unique:users,username,' . $request->user()->id,
            'bio' => ['nullable'],
            'avatar' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024']
        ]);


        if (isset($request->avatar)) {
            $request->user()->updateAvatar($request->avatar);
        }

        $request->user()->update([
            'name' => $request->name,
            'username' => $request->username,

        ]);

        $request->user()->profile()->exists() ?
            $request->user()->profile()->update([
                'bio' => $request->bio,
            ]) :
            $request->user()->profile()->create([
                'bio' => $request->bio,
            ]);


        return back(303)->with([
            'type' => 'success',
            'message' => 'profile updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroyPhoto(Request $request)
    {
        $request->user()->deleteAvatar();

        return back(303)->with([
            'type' => 'success',
            'message' => 'profile deleted'
        ]);
    }
}
