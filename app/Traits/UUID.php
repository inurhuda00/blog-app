<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait UUID
{
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if ($model->uuid === null) {
                $model->setAttribute('uuid', Str::uuid()->toString());
            }
        });
    }
    public function getIncrement()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
