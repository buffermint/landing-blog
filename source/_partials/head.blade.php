<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- shared brand: Hanken Grotesk + --bm-* colour tokens (git submodule brand/, published at /brand/) -->
<link rel="preload" href="/brand/fonts/hanken-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/brand/tokens.css?v={{ $page->brand_v('tokens.css') }}">
<link rel="stylesheet" href="{{ mix('fonts/feather/feather.css', 'assets/build') }}">
<link rel="stylesheet" href="{{ mix('css/vendor.css', 'assets/build') }}">
<link rel="stylesheet" href="{{ mix('css/theme.css', 'assets/build') }}">

@php
  // pages set these with @section('page-title') / @section('page-description')
  $page_title = trim($__env->yieldContent('page-title')) ?: $page_title;
  $description = trim($__env->yieldContent('page-description')) ?: $description;
  $share_image = $page->featured_image ?? '/brand/logos/mark.png';
  if (! preg_match('#^https?://#', $share_image)) {
    $share_image = rtrim($page->baseUrl, '/') . '/' . ltrim($share_image, '/');
  }
  $is_post = str_starts_with($page->getPath(), '/articles/');
@endphp

<title>{{ mb_strlen($page_title) + mb_strlen($page->brand->name) + 3 > 65 ? $page_title : $page_title . ' | ' . $page->brand->name }}</title>
<meta name="description" content="{{ $description }}">
<link rel="canonical" href="{{ $page->getUrl() }}">

<meta property="og:type" content="{{ $is_post ? 'article' : 'website' }}" />
<meta property="og:title" content="{{ $page_title }}" />
<meta property="og:description" content="{{ $description }}" />
<meta property="og:image" content="{{ $share_image }}" />
<meta property="og:url" content="{{ $page->getUrl() }}" />
<meta property="og:site_name" content="{{ $page->brand->name }}" />

<meta name="twitter:card" content="{{ $page->featured_image ? 'summary_large_image' : 'summary' }}">
<meta name="twitter:title" content="{{ $page_title }}">
<meta name="twitter:description" content="{{ $description }}">
<meta name="twitter:image" content="{{ $share_image }}">
<meta name="twitter:site" content="@buffermint">
<meta name="twitter:creator" content="@buffermint">

<link rel="icon" href="/brand/logos/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/brand/logos/mark-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/brand/logos/mark-180.png">
<meta name="theme-color" content="{{ $page->brand->colors->light->bg }}">

<link rel="alternate" type="application/atom+xml" title="{{ $page->brand->name }} blog" href="{{ rtrim($page->baseUrl, '/') }}/feed.xml">
@if ($page->brand->verification->google ?? null)
<meta name="google-site-verification" content="{{ $page->brand->verification->google }}">
@endif
@if ($page->brand->verification->bing ?? null)
<meta name="msvalidate.01" content="{{ $page->brand->verification->bing }}">
@endif

@php
  // structured data: Organization (brand repo) on every page, plus WebSite / Article / BreadcrumbList
  $site = rtrim($page->baseUrl, '/');
  $jsonld = [];
  $crumbs = [['Home', $site . '/']];
  if (trim($page->getPath(), '/') === '') {
    $jsonld[] = ['@context' => 'https://schema.org', '@type' => 'WebSite', 'name' => $page->brand->name,
      'url' => $site . '/', 'description' => $page->brand->description, 'publisher' => ['@type' => 'Organization', 'name' => $page->brand->name, 'url' => $site]];
  } elseif ($is_post) {
    $published = date('c', $page->date);
    $jsonld[] = ['@context' => 'https://schema.org', '@type' => 'BlogPosting', 'headline' => $page->title,
      'description' => $description, 'image' => $share_image, 'url' => $page->getUrl(),
      'mainEntityOfPage' => $page->getUrl(), 'datePublished' => $published,
      'dateModified' => $page->updated ? date('c', is_numeric($page->updated) ? $page->updated : strtotime($page->updated)) : $published,
      'author' => ['@type' => 'Person', 'name' => $page->author],
      'publisher' => ['@type' => 'Organization', 'name' => $page->brand->name, 'logo' => ['@type' => 'ImageObject', 'url' => $site . '/brand/logos/mark.png']]];
    $crumbs[] = ['Blog', $site . '/articles'];
    $crumbs[] = [$page->title, $page->getUrl()];
  } else {
    $crumbs[] = [$page_title, $page->getUrl()];
  }
  if (count($crumbs) > 1) {
    $jsonld[] = ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => array_map(
      fn ($c, $i) => ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $c[0], 'item' => $c[1]], $crumbs, array_keys($crumbs))];
  }
@endphp
<script type="application/ld+json">{!! $page->organization_jsonld !!}</script>
@foreach ($jsonld as $item)
<script type="application/ld+json">{!! json_encode($item, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG) !!}</script>
@endforeach

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-10GHKFV46D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-10GHKFV46D');
</script>

<!-- cookie-free page views and CTA events (GoatCounter, shared with /tools/; brand repo analytics.js) -->
<script defer src="/brand/analytics.js?v={{ $page->brand_v('analytics.js') }}"></script>