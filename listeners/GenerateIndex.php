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
            return $this->mappedObject($page, $jigsaw);
        })->values());

        $featuredCount = $jigsaw->getConfig('featured_posts_count');
        $featured = $this->getFeaturedCollections($collection, $featuredCount);

        $featured = collect($featured->map(function ($page) use ($jigsaw) {
            return $this->mappedObject($page, $jigsaw);
        })->values());

        file_put_contents($jigsaw->getDestinationPath() . '/index.json', json_encode($data));
        file_put_contents($jigsaw->getDestinationPath() . '/featured.json', json_encode($featured));
    }

    private function mappedObject($page, $jigsaw){
        return [
            'title' => $page->title,
            'categories' => $page->categories,
            'image' => $page->featured_thumbnail ?? $page->featured_image,
            'author' => $page->author,
            'link' => rightTrimPath($jigsaw->getConfig('baseUrl')) . $page->getPath(),
            'snippet' => $page->getSnippet(),
            'excerpt' => $page->excerpt,
            'date' => gmdate("d M Y", $page->getModifiedTime())
        ];
    }


    public function getFeaturedCollections($collection, $featuredCount)
    {
        $featured = $collection->filter(function ($page){
            return $page->is_featured ?? false;
        });

        if($featured->count() > $featuredCount){
            return $featured->slice(0, $featuredCount);
        }

        $remainingCount = $featuredCount - $featured->count();

        $unfeatured = $collection->filter(function ($page){
            return isset($page->is_featured) ? !$page->is_featured : true;
        });

        $featured = $featured->concat($unfeatured->slice(0, $remainingCount));

        return $featured;
    }
}
