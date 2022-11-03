<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Jetstream\Features;

trait HasProfilePhoto
{
    /**
     * Update the user's profile photo.
     *
     * @param  \Illuminate\Http\UploadedFile  $photo
     * @return void
     */
    public function updateAvatar(UploadedFile $photo)
    {
        tap($this->avatar, function ($previous) use ($photo) {
            $this->forceFill([
                'avatar' => $photo->storePublicly(
                    'avatar',
                    ['disk' => $this->AvatarDisk()]
                ),
            ])->save();

            if ($previous) {
                Storage::disk($this->AvatarDisk())->delete($previous);
            }
        });
    }

    /**
     * Delete the user's profile photo.
     *
     * @return void
     */
    public function deleteAvatar()
    {

        if (is_null($this->avatar)) {
            return;
        }

        Storage::disk($this->AvatarDisk())->delete($this->avatar);

        $this->forceFill([
            'avatar' => null,
        ])->save();
    }

    /**
     * Get the URL to the user's profile photo.
     *
     * @return string
     */
    public function getAvatarUrlAttribute()
    {
        return $this->avatar
            ? Storage::disk($this->AvatarDisk())->url($this->avatar)
            : $this->defaultAvatarUrl();
    }

    /**
     * Get the default profile photo URL if no profile photo has been uploaded.
     *
     * @return string
     */
    protected function defaultAvatarUrl()
    {
        $name = trim(collect(explode(' ', $this->name))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=7F9CF5&background=EBF4FF';
    }

    /**
     * Get the disk that profile photos should be stored on.
     *
     * @return string
     */
    protected function AvatarDisk()
    {
        return isset($_ENV['VAPOR_ARTIFACT_NAME']) ? 's3' : 'public';
    }
}
