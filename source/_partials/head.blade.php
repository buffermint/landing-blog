<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link rel="stylesheet" href="{{ mix('fonts/feather/feather.css', 'assets/build') }}">
<link rel="stylesheet" href="{{ mix('css/vendor.css', 'assets/build') }}">


<!-- Map -->
<link href='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />

<link rel="stylesheet" href="{{ mix('css/theme.css', 'assets/build') }}">

<title>@yield('page-title', $page_title) | BufferMint</title>
<meta name="description" content="{{ $description }}">
<meta name=”robots” content="index, follow">

<meta property="og:type" content="article" />
<meta property="og:title" content="{{ $page_title }}" />
<meta property="og:description" content="{{ $description }}" />
<meta property="og:image" content="{{ $page->featured_image ?? mix('img/logos/logo_square.png', 'assets/build') }}" />
<meta property="og:url" content="{{ $page->getUrl() ?? 'https://buffermint.com' }}" />
<meta property="og:site_name" content="BufferMint" />


<meta name="twitter:title" content="{{ $page_title }}">
<meta name="twitter:description" content="{{ $description }}">
<meta name="twitter:image" content="{{ $page->featured_image ?? mix('img/logos/logo_square.png', 'assets/build') }}">
<meta name="twitter:site" content="@buffermint">
<meta name="twitter:creator" content="@buffermint">

<link rel="apple-touch-icon" sizes="57x57" href="{{ mix('img/favicons/apple-icon-57x57.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="60x60" href="{{ mix('img/favicons/apple-icon-60x60.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="72x72" href="{{ mix('img/favicons/apple-icon-72x72.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="76x76" href="{{ mix('img/favicons/apple-icon-76x76.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="114x114" href="{{ mix('img/favicons/apple-icon-114x114.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="120x120" href="{{ mix('img/favicons/apple-icon-120x120.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="144x144" href="{{ mix('img/favicons/apple-icon-144x144.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="152x152" href="{{ mix('img/favicons/apple-icon-152x152.png', 'assets/build') }}">
<link rel="apple-touch-icon" sizes="180x180" href="{{ mix('img/favicons/apple-icon-180x180.png', 'assets/build') }}">
<link rel="icon" type="image/png" sizes="192x192"
  href="{{ mix('img/favicons/android-icon-192x192.png', 'assets/build') }}">
<link rel="icon" type="image/png" sizes="32x32" href="{{ mix('img/favicons/favicon-32x32.png', 'assets/build') }}">
<link rel="icon" type="image/png" sizes="96x96" href="{{ mix('img/favicons/favicon-96x96.png', 'assets/build') }}">
<link rel="icon" type="image/png" sizes="16x16" href="{{ mix('img/favicons/favicon-16x16.png', 'assets/build') }}">
<link rel="manifest" href="{{ mix('img/favicons/manifest.json', 'assets/build') }}">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="{{ mix('img/favicons/ms-icon-144x144.png', 'assets/build') }}">
<meta name="theme-color" content="#ffffff">

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

<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>