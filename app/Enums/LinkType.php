<?php

namespace App\Enums;

enum LinkType: string
{
    case WEBSITE = 'website';
    case TWITTER = 'twitter';
    case FACEBOOK = 'facebook';
    case LINKEDIN = 'linkedin';
    case TELEGRAM = 'telegram';
    case INSTAGRAM = 'instagram';
}
