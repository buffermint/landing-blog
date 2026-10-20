<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

/** Publishes the shared brand files (brand/dist: tokens.css, fonts, logos) at /brand/. */
class CopyBrandAssets
{
    public function handle(Jigsaw $jigsaw)
    {
        $source = __DIR__ . '/../brand/dist';

        if (! is_dir($source)) {
            throw new \RuntimeException('brand/dist is missing: run `git submodule update --init`.');
        }

        $jigsaw->getFilesystem()->copyDirectory($source, $jigsaw->getDestinationPath() . '/brand');
    }
}
