# buffermint.com landing site + blog

A [Jigsaw](https://jigsaw.tighten.com/) static site, built with laravel-mix and served at
https://buffermint.com/ from Cloudflare Pages. `/tools/` is a separate site (the buffermint-tools repo);
`../buffermint-pages/publish.sh` combines both builds into the one Pages project.

## Brand

Name, tagline, copy, nav, colours, font and logos come from the shared brand repo
(`buffermint/brand`), checked out as a git submodule at `brand/`:
- `config.php` reads `brand/dist/brand.json` (nav, footer nav, CTA, description, Organization JSON-LD);
- `_user-variables.scss` maps the Bootstrap/theme variables onto `brand/dist/_tokens.scss`;
- `listeners/CopyBrandAssets.php` publishes `brand/dist/` at `/brand/` (`tokens.css`, the Hanken Grotesk
  font, logos and favicons).

Fonts (decided 2026-10-24): the only text font is Hanken Grotesk, served by the brand repo at
`/brand/fonts/`. The theme's HK Grotesk Pro (a paid font) is dropped for good and is not in git; don't add it
back. The Feather icon font is in `source/_assets/fonts/Feather/` and is copied by `webpack.mix.js`.

`source/assets/build/` is generated and stays gitignored: `yarn run prod` rebuilds every file in it from
`source/_assets/` and `node_modules/`. The old favicons (`img/favicons/`) and logos (`brand.svg`,
`logo_square.png`) are no longer linked from any page but are still requested at their old URLs, so they
live in `source/_assets/img/` and are copied too.

Change the brand in that repo, never here. To pick up a new brand version:
`git submodule update --remote brand`, rebuild, commit the submodule bump.

## Requirements

PHP 8.2 to 8.5 (Jigsaw 1.3 is pinned; upgrading to 1.8 is PLAN item 12 option B), Composer, Node 20+
(`.nvmrc`) and Yarn 1.

`package.json` pins webpack to `~5.104.1` through `resolutions`: laravel-mix 6 reaches into webpack
internals (`webpack/lib/SizeFormatHelpers`) that 5.112 removed, and releases before 5.61 need
`--openssl-legacy-provider` on Node 17+. The other `resolutions` lift security fixes past laravel-mix 6 and
vue-loader 15 ranges (postcss 8, postcss-selector-parser 7, uuid 11, webpack-dev-server 5). With
webpack-dev-server 5, `mix watch --hot` no longer starts; `yarn run dev` / `watch` / `prod` are unaffected.

## Build and preview

```bash
git submodule update --init   # brand/ (clone with --recurse-submodules to skip this)
composer install
yarn install
yarn watch            # builds into build_local/ and serves it at http://localhost:3000
```

PHP 8.4+ can print `Deprecated:` lines from Jigsaw 1.3; they are harmless. `deploy.sh` hides only
those (`php -d error_reporting='E_ALL & ~E_DEPRECATED'`) and shows any other error.

## Deploy

```bash
./deploy.sh           # production build, SEO check, then publish to Cloudflare Pages
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
