<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

class GenerateIndex
{
    public function handle(Jigsaw $jigsaw)
    {
        $collection = $jigsaw->getCollection('posts') ?? collect([]);

        $data = collect($collection->map(function ($page) use ($jigsaw) {
            return $this->mappedObject($page, $jigsaw);
        })->values());

        $featuredCount = $jigsaw->getConfig('featured_posts_count');
        $featured = $this->getFeaturedCollections($collection, $featuredCount);

        $featured = collect($featured->map(function ($page) use ($jigsaw) {
            return $this->mappedObject($page, $jigsaw);
        })->values());

        // JSON_THROW_ON_ERROR: invalid UTF-8 fails the build instead of writing an empty index.json
        file_put_contents($jigsaw->getDestinationPath() . '/index.json', json_encode($data, JSON_THROW_ON_ERROR));
        file_put_contents($jigsaw->getDestinationPath() . '/featured.json', json_encode($featured, JSON_THROW_ON_ERROR));
    }

    private function mappedObject($page, $jigsaw)
    {
        $image = $page->featured_thumbnail ?? $page->featured_image;

        return [
            'title' => $page->title,
            // Fuse.js only indexes strings, so ship the post's own category as a
            // list of {slug, name} rather than the site-wide map of category objects.
            'categories' => $this->postCategories($page),
            'image' => $image,
            // the smaller WebP copy next to the image, if there is one (the card offers it in a <picture>)
            'webp' => $this->webpCopy($image, $jigsaw->getDestinationPath()),
            'author' => $page->author,
            'link' => $page->getPath(),
            'snippet' => $page->getSnippet(),
            'excerpt' => $page->excerpt,
            'date' => gmdate("d M Y", $page->date),
            'iso_date' => gmdate('Y-m-d', $page->date),
        ];
    }

    private function webpCopy($image, $dest)
    {
        if (! $image || ! preg_match('~\.(jpe?g|png)$~i', $image)) {
            return null;
        }
        $webp = preg_replace('~\.(jpe?g|png)$~i', '.webp', $image);

        return is_file($dest . '/' . ltrim(rawurldecode($webp), '/')) ? $webp : null;
    }

    private function postCategories($page)
    {
        $category = $page->category ? ($page->categories[$page->category] ?? null) : null;

        return $category ? [['slug' => $category['slug'], 'name' => $category['name']]] : [];
    }

    public function getFeaturedCollections($collection, $featuredCount)
    {
        $featured = $collection->filter(function ($page) {
            return $page->is_featured ?? false;
        });

        if ($featured->count() > $featuredCount) {
            return $featured->slice(0, $featuredCount);
        }

        $remainingCount = $featuredCount - $featured->count();

        $unfeatured = $collection->filter(function ($page) {
            return isset($page->is_featured) ? !$page->is_featured : true;
        });

        $featured = $featured->concat($unfeatured->slice(0, $remainingCount));

        return $featured;
    }
}
