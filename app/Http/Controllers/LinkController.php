<?php

namespace App\Http\Controllers;

use App\Enums\LinkType;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class LinkController extends Controller
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function show(Link $link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Link $link)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroy(Link $link)
    {

        $link->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'article deleted'
        ]);
    }
}
