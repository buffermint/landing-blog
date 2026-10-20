# buffermint.com landing site + blog

A [Jigsaw](https://jigsaw.tighten.com/) static site, built with laravel-mix and served at
https://buffermint.com/ from the droplet by Caddy. `/tools/` is a separate site (the buffermint-tools
repo, which also owns the Caddy config in `deploy/buffermint.caddy`).

## Requirements

PHP 8.2+, Composer, Node 20+ (`.nvmrc`) and Yarn 1.

`package.json` pins webpack to `~5.94.0` through `resolutions`: laravel-mix 6 (webpackbar and its build
output plugin) breaks on newer webpack releases, and older ones need `--openssl-legacy-provider` on Node 17+.

## Build and preview

```bash
composer install
yarn install
yarn watch            # builds into build_local/ and serves it at http://localhost:3000
```

PHP 8.4 prints `Deprecated:` lines from Jigsaw 1.3; they are harmless.

## Deploy

```bash
./deploy.sh           # production build, then rsync to the droplet
```

## Writing a post

1. Create `source/_posts/<slug>.blade.md`. The slug becomes the URL: `/articles/<slug>`.
2. Put images in `source/assets/img/uploads/` and reference them with a leading slash,
   e.g. `![Alt text](/assets/img/uploads/my-image.jpeg)`.
3. Preview with `yarn watch`, commit, push, then run `./deploy.sh`.

Front matter (copy this):

```yaml
---
extends: _layouts.post
section: postContent
title: "Post title"
seo_description: "One or two sentences for search results and link previews."
excerpt: "Short summary shown under the title and on article cards."
author: "Rishabh Pandey"
date: 2026-10-20
category: startup_ideas        # or idea_validation (see config.php), optional
featured: false                # featured posts are listed first on /articles
featured_image: assets/img/uploads/my-cover.jpeg        # wide cover, about 1950 px
featured_thumbnail: assets/img/uploads/my-thumb.jpeg    # card image, about 500 px
show_meta: true                # author, date and share links
hero_image:                    # optional image under the title
hero_image_caption:
author_image:
---
```

`extends`, `section`, `title`, `seo_description`, `author`, `date`, `featured_image` and
`featured_thumbnail` are required. Inside a post you can use `<x-quote credit="Name">…</x-quote>` and
`<x-image url="/assets/img/uploads/…" caption="…" alt="…"></x-image>`.
