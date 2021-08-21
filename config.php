<?php

return [
    'production' => false,
    'baseUrl' => 'http://localhost:3000/',
    'title' => 'BufferMint',
    'description' => 'Launch your SaaS in 45 days',

    'discovery_call_url' => 'https://calendly.com/buffermint/30min',

    'featured_posts_count' => 9,

    'nav_menu' => [
        "About Us" => "/about-us",
        // "What we do?" => "/#what-we-do",
        // "Pricing" => "/#pricing",
        "Blog" => "/articles",
        "Careers" => "/careers",
        "Contact" => "/contact-us",
    ],

    // collections
    'collections' => [
        'posts' => [
            'author' => 'Rishabh Pandey', // Default author, if not provided in a post
            'sort' => '-date',
            'path' => 'articles/{filename}',
            'filter' => function ($post) {
                return ($post->published ?? true);
            }
        ],

       'about' => [
           'author' => 'Rishabh Pandey', // Default author, if not provided in a post
           'show_meta' => false,
           'sort' => '-date',
           'path' => '/{filename}',
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
    }
];
