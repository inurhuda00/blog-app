<?php

namespace App\Enums;

enum ArticleStatus: int
{
    case DRAFT = 0;
    case REVIEW = 1;
    case PUBLISHED = 2;
    case REJECTED = 3;

    public function label()
    {
        return match ($this) {
            self::DRAFT => 'draft',
            self::REVIEW => 'review',
            self::PUBLISHED => 'published',
            self::REJECTED => 'rejected',
        };
    }
}
