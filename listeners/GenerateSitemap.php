<?php

namespace App\Listeners;

use Illuminate\Support\Str;
use samdark\sitemap\Sitemap;
use TightenCo\Jigsaw\Jigsaw;

class GenerateSitemap
{
    protected $exclude = [
        '/assets/*',
        '*/favicon.ico',
        '*/404*',
        '/admin*',
        '/feed.xml',
    ];

    public function handle(Jigsaw $jigsaw)
    {
        $baseUrl = $jigsaw->getConfig('baseUrl');

        if (!$baseUrl) {
            echo("\nTo generate a sitemap.xml file, please specify a 'baseUrl' in config.php.\n\n");

            return;
        }

        $sitemap = new Sitemap($jigsaw->getDestinationPath() . '/sitemap.xml');

        // posts get their publish date as lastmod; other pages have no meaningful date, so none
        $postDates = collect($jigsaw->getCollection('posts'))->mapWithKeys(function ($post) {
            return [trimPath($post->getPath()) => $post->date];
        });

        collect($jigsaw->getOutputPaths())
            ->reject(function ($path) {
                return $this->isExcluded($path);
            })->each(function ($path) use ($baseUrl, $sitemap, $postDates) {
                $sitemap->addItem(rtrim($baseUrl, '/') . $path, $postDates->get(trimPath($path)));
            });

        $sitemap->write();
    }

    public function isExcluded($path)
    {
        return Str::is($this->exclude, $path);
    }
}
