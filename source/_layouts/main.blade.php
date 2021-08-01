<!doctype html>
<html lang="en">

<head>
  @include('_partials.head', [
  'page_title' => ($page->title ?? 'Home') . ' | BufferMint',
  'description' => ($page->seo_description ?? $page->excerpt) ?? 'We Design, Build & Launch SaaS products for founders.
  We
  help you launch and scale a high-quality MVP on a fixed budget.'
  ])
</head>

<body class="bg-light home-page">
  @include('_partials.navbar')

  <div id="app">
    @yield('content')
  </div>


  @include('_partials.footer')

  @include('_partials.scripts')
</body>

</html>