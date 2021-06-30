<!doctype html>
<html lang="en">
  <head>
    @include('_partials.head',  [
            'page_title' => 'Home | BufferMint',
            'description' => 'We Design, Build & Launch products for founders. We help you launch and scale a high-quality MVP on a fixed budget.'
        ])
  </head>
  <body class="bg-light home-page">
    @include('_partials.navbar')


    @yield('content')


    @include('_partials.footer')

    @include('_partials.scripts')

  </body>
</html>
