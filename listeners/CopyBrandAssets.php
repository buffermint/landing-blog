<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

/** Publishes the shared brand files (brand/dist: tokens.css, analytics.js, fonts, logos) at /brand/. */
class CopyBrandAssets
{
    public function handle(Jigsaw $jigsaw)
    {
        $source = __DIR__ . '/../brand/dist';

        if (! is_dir($source)) {
            throw new \RuntimeException('brand/dist is missing: run `git submodule update --init`.');
        }

        $jigsaw->getFilesystem()->copyDirectory($source, $jigsaw->getDestinationPath() . '/brand');

        // IndexNow key file: search engines fetch it from the site root (brand.json indexNow.key)
        $key = json_decode(file_get_contents($source . '/brand.json'), true)['indexNow']['key'];
        copy("$source/$key.txt", $jigsaw->getDestinationPath() . "/$key.txt");
    }
}
