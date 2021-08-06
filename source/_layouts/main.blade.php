<!doctype html>
<html lang="en">

<head>
  @include('_partials.head', [
  'page_title' => ($page_title ?? $page->title ?? 'Home'),
  'description' => ($page->seo_description ?? $page->excerpt) ?? 'Launch your SaaS in 45 days'
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