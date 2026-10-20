<?php

// name, copy, nav and links come from the shared brand repo (git submodule at brand/)
$brand = json_decode(file_get_contents(__DIR__ . '/brand/dist/brand.json'), true);
$links = fn ($items) => collect($items)->mapWithKeys(fn ($item) => [$item['label'] => $item['href']])->all();

return [
    'production' => false,
    'baseUrl' => 'http://localhost:3000/',
    'brand' => $brand,
    'organization_jsonld' => file_get_contents(__DIR__ . '/brand/dist/organization.jsonld'),
    'title' => $brand['name'],
    'description' => $brand['description'],

    'discovery_call_url' => $brand['discoveryCallUrl'],

    'featured_posts_count' => 9,

    'default_featured_headline' => 'Featured Articles',
    'default_featured_tagline' => 'Not sure where to start? Here is the list of our best articles hand-picked for
    you.',
    'default_recent_headline' => 'Recent Articles',
    'default_recent_tagline' => 'Our latest articles across all categories.',

    'nav_menu' => $links($brand['nav']),
    'footer_menu' => $links($brand['footerNav']),

    'categories' => [
        'idea_validation' => [
            'slug' => 'idea-validation',
            'name' => "Idea Validation",
            'description' => "How to validate a startup idea before you build: customer interviews, landing-page tests, MVPs and real examples.",
            // 'recent_heading' => 'Recent Stuff',
            // 'recent_tagline' => 'Recent tagline',
            // 'featured_heading' => 'Featured Stuff',
            // 'featured_tagline' => 'Featured tagline',
        ],
        'startup_ideas' => [
            'slug' => 'startup-ideas',
            'name' => "Startup Ideas",
            'description' => "Where to find your next startup idea: micro-SaaS ideas, market trends and how to judge which ideas are worth building.",
        ],
    ],

    // collections
    'collections' => [
        'pages' => [
            'author' => 'Rishabh Pandey', // Default author, if not provided in a post
            'show_meta' => false,
            'sort' => '-date',
            'path' => '/{filename}',
            'filter' => function ($post) {
                return ($post->published ?? true);
            }
        ],
        'posts' => [
            'name' => null,
            'author' => 'Rishabh Pandey', // Default author, if not provided in a post
            'sort' => '-date',
            'path' => 'articles/{filename}',
            'filter' => function ($post) {
                return ($post->published ?? true);
            }
        ],
    ],

    // helpers
    'getDate' => function ($page) {
        return Datetime::createFromFormat('U', $page->date);
    },

    'getSnippet' => function ($page, $length = 255) {
        $content = preg_split('/<!-- more -->/m', $page->getContent(), 2);
        $cleaned = trim(
            strip_tags(
                preg_replace(['/<pre>[\w\W]*?<\/pre>/', '/<h\d>[\w\W]*?<\/h\d>/'], '', $content[0]),
                '<code>'
            )
        );

        if (count($content) > 1) {
            return $cleaned;
        }

        $truncated = substr($cleaned, 0, $length);

        if (substr_count($truncated, '<code>') > substr_count($truncated, '</code>')) {
            $truncated .= '</code>';
        }

        return strlen($cleaned) > $length
            ? preg_replace('/\s+?(\S+)?$/', '', $truncated) . '...'
            : $cleaned;
    },

    'isActive' => function ($page, $path) {
        return \Illuminate\Support\Str::endsWith(trimPath($page->getPath()), trimPath($path));
    },

    'getReadTime' => function ($page, $wpm = 150) {
        $content = strip_tags($page->getContent());
        $word_count = str_word_count($content);
        return ceil($word_count / $wpm);
    },
];
