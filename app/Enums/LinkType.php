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

    public function fullUrl($url)
    {
        return match ($this) {
            LinkType::TWITTER => 'https://twitter.com/' . $url,
            LinkType::FACEBOOK => 'http://facebook.com/' . $url,
            LinkType::LINKEDIN => 'http://linkedin.com/' . $url,
            LinkType::TELEGRAM => 'http://t.me/' . $url,
            LinkType::INSTAGRAM => 'http://instagram.com/' . $url,
            LinkType::WEBSITE => $url,
        };
    }
}
