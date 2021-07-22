<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

class GenerateIndex
{
    public function handle(Jigsaw $jigsaw)
    {
        $posts = $jigsaw->getCollection('posts') ?? collect([]);
        $tutorials = $jigsaw->getCollection('tutorials') ?? collect([]);

        $collection = $posts->concat($tutorials);

        $data = collect($collection->map(function ($page) use ($jigsaw) {
            return [
                'title' => $page->title,
                'description' => $page->description,
                'categories' => $page->categories,
                'image' => $page->featured_thumbnail ?? $page->featured_image,
                'author' => $page->author,
                'link' => rightTrimPath($jigsaw->getConfig('baseUrl')) . $page->getPath(),
                'snippet' => $page->getExcerpt(),
                'date' => gmdate("d M Y", $page->getModifiedTime())
            ];
        })->values());


        file_put_contents($jigsaw->getDestinationPath() . '/index.json', json_encode($data));
    }
}
