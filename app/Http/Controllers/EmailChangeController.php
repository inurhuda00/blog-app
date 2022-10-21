<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\EmailChangeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class EmailChangeController extends Controller
{
    public function __construct()
    {
        // Only the authenticated user can change its email, but he should be able
        // to verify his email address using other device without having to be
        // authenticated. This happens a lot when they confirm by phone.
        $this->middleware('auth')->only('change');

        // A signed URL will prevent anyone except the User to change his email.
        $this->middleware('signed')->only('verify');
    }


    /**
     * Changes the user Email Address for a new one
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function change(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users'
        ]);


        // Send the email to the user
        Notification::route('mail', $request->email)
            ->notify(new EmailChangeNotification($request->user()));

        // Return the view
        return back()->with([
            'type' => 'success',
            'message' => 'check inbox ' . $request->email
        ]);
    }

    /**
     * Verifies and completes the Email change
     *
     * @param Request $request
     * @param User $user
     * @param string $email
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function verify(Request $request, User $user)
    {

        $request->validate([
            'email' => 'required|email|unique:users'
        ]);

        // Change the Email
        $user->update([
            'email' => $request->email
        ]);

        // And finally return the view telling the change has been done
        return to_route('settings.account')->with([
            'type' => 'success',
            'message' => 'email Changed 🎉'
        ]);;
    }
}
