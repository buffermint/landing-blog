<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- shared brand: Hanken Grotesk + --bm-* colour tokens (git submodule brand/, published at /brand/) -->
<link rel="preload" href="/brand/fonts/hanken-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/brand/tokens.css">
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

<title>{{ $page_title }} | {{ $page->brand->name }}</title>
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

<script type="application/ld+json">{!! $page->organization_jsonld !!}</script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-10GHKFV46D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-10GHKFV46D');
</script>

<!-- Hotjar Tracking Code for http://buffermint.com/ -->
<script>
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:2570179,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>