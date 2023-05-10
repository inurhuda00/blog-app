<?php

namespace App\Http\Controllers\Auth;

use App\Enums\LinkType;
use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Inertia::location(Socialite::driver($provider)->redirect()->getTargetUrl());
    }

    public function handleProvideCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Throwable $th) {
            return redirect()->back();
        }

        $socialAccount = SocialAccount::where("provider_id", $socialUser->getId())->firstOr(function () use ($socialUser, $provider) {
            $user = User::where(["email" => $socialUser->getEmail()])->firstOr(
                function () use ($socialUser) {
                    $user = User::create([
                        'name' =>  $socialUser->getName(),
                        'email' => $email = $socialUser->getEmail(),
                        'username' => strstr($email, '@', true),
                    ]);

                    $user->assignRole('writer');

                    $profile = $user->profile()->create([
                        'bio' => Inspiring::quote()
                    ]);

                    $profile->links()->create([
                        'name' => LinkType::WEBSITE->value,
                        'url' => env('APP_URL') . '/' . $user->username,
                        'display' => 'goahira.co'
                    ]);

                    return $user;
                }
            );

            $user->socialAccount()->create([
                'provider_id'   => $socialUser->getId(),
                'provider_name' => $provider
            ]);

            return $user->socialAccount;
        });

        Auth::Login($socialAccount->user, true);

        return redirect(RouteServiceProvider::HOME);
    }
}
