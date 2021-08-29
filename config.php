<?php

return [
    'production' => false,
    'baseUrl' => 'http://localhost:3000/',
    'title' => 'BufferMint',
    'description' => 'Launch your SaaS in 45 days. We turn your idea into an amazing MVP on a fixed budget and take your product to market ASAP.',
    'keywords' => 'launch your mvp, need an mvp, idea to product, develop saas mvp',

    'discovery_call_url' => 'https://calendly.com/buffermint/30min',

    'featured_posts_count' => 9,

    'default_featured_headline' => 'Featured Articles',
    'default_featured_tagline' => 'Not sure where to start? Here is the list of our best articles hand-picked for
    you.',
    'default_recent_headline' => 'Recent Articles',
    'default_recent_tagline' => 'Our latest articles across all categories.',

    'nav_menu' => [
        "About Us" => "/about-us",
        // "What we do?" => "/#what-we-do",
        // "Pricing" => "/#pricing",
        "Blog" => "/articles",
        "Careers" => "/careers",
        "Contact" => "/contact-us",
    ],

    'categories' => [
        'idea_validation' => [
            'slug' => 'idea-validation',
            'name' => "Idea Validation",
            'description' => "All about validating your startup ideas.",
            // 'recent_heading' => 'Recent Stuff',
            // 'recent_tagline' => 'Recent tagline',
            // 'featured_heading' => 'Featured Stuff',
            // 'featured_tagline' => 'Featured tagline',
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

    'getCollectionNames' => function(){
        return ['posts', 'idea_generation'];
    }
];
