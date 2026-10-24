<!doctype html>
<html lang="en">

<head>
  @include('_partials.head', [
  'page_title' => ($page_title ?? $page->title ?? 'Home'),
  'description' => $page->seo_description ?? $page->excerpt ?? $page->description,
  ])
</head>

<body class="bg-light home-page">
  @include('_partials.navbar')

  <main id="app">
    @yield('content')
  </main>


  @include('_partials.footer')

  @include('_partials.scripts')
</body>

</html>