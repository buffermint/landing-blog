@extends('_layouts.main')

@section('page-title', 'Useful software and free online tools')
@section('page-description', 'BufferMint builds software: ' . $page->brand->toolCount . ' free tools that run in your browser, and SaaS products we design, build and launch for founders.')

@section('content')

@include('_partials/hero')

@include('_partials.free-tools')

<!-- SERVICES -->
<section class="site-section site-alt" id="services">
  <div class="bm-container">
    <div class="site-head">
      <h2>Have a product idea? We'll build it with you.</h2>
      <p>We design, build and launch SaaS products and MVPs for founders. We start with a focused first version and a fixed price, and we keep improving it once real users arrive.</p>
    </div>
    <ol class="site-steps">
      <li>
        <h3>Plan</h3>
        <p>We agree on the smallest version of your product that early customers will pay for, and write it down: features, screens and a launch date.</p>
      </li>
      <li>
        <h3>Design and build</h3>
        <p>We design and develop it in short cycles. You see working software every week and tell us what to change.</p>
      </li>
      <li>
        <h3>Launch and improve</h3>
        <p>We launch with you, measure how people use the product, and plan the next release from what we learn.</p>
      </li>
    </ol>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="site-section">
  <div class="bm-container">
    <div class="site-quotes">
      <figure class="site-quote">
        <a href="https://www.zenmindmap.com/" class="site-quote-logo"><img src="{{ mix('img/logos/zmm-logo.png', 'assets/build') }}" alt="Zen Mind Maps" height="32"></a>
        <blockquote>“BufferMint helped us launch two products. Their thoughtfulness, attitude and focus on results show their credibility. They have been crucial to the success of our products.”</blockquote>
        <figcaption><img src="{{ mix('img/photos/nick.png', 'assets/build') }}" alt="" width="40" height="40"> <span><b>Nick Hoang</b> Zen Mind Maps</span></figcaption>
      </figure>
      <figure class="site-quote">
        <a href="https://www.shasilluminated.org/" class="site-quote-logo"><img src="{{ mix('img/logos/shas-logo.png', 'assets/build') }}" alt="Shas Illuminated" height="32"></a>
        <blockquote>“BufferMint is a wonderful agency for both design and development. They have been the perfect partner for Shas Illuminated. They are a pleasure to work with and I recommend them highly for anyone that wants a beautiful web application.”</blockquote>
        <figcaption><img src="{{ mix('img/photos/yacov.jpeg', 'assets/build') }}" alt="" width="40" height="40"> <span><b>Yacov Metz</b> Shas Illuminated</span></figcaption>
      </figure>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="site-section site-alt" id="pricing">
  <div class="bm-container">
    <div class="site-head">
      <h2>A fixed price, agreed before we start</h2>
      <p>You know the cost up front. If the scope changes, we agree the change in writing first.</p>
    </div>
    <div class="site-plans">
      <div class="site-plan">
        <h3>MVP</h3>
        <ul class="site-checks">
          <li>A launch plan of about 45 days</li>
          <li>Product design and development</li>
          <li>A clean, simple interface</li>
          <li>An admin dashboard</li>
        </ul>
        <a class="bm-btn bm-btn-primary" href="{{ $page->discovery_call_url }}" target="_blank" rel="noopener" data-cta="pricing-mvp">Book a call</a>
      </div>
      <div class="site-plan">
        <h3>Full product</h3>
        <p>We usually recommend launching small first. If you already have the research to support a bigger first release, we'll scope it with you.</p>
        <a class="bm-btn bm-btn-secondary" href="/contact-us" data-cta="pricing-full">Talk to us</a>
      </div>
    </div>
  </div>
</section>

<!-- BLOG -->
<section class="site-section">
  <div class="bm-container">
    <div class="site-head">
      <h2>From the blog</h2>
      <p>Notes on validating ideas, building MVPs and launching SaaS products.</p>
    </div>
    <div class="site-posts">
      @foreach ($posts->take(3) as $article)
      <a class="site-post" href="{{ $article->getUrl() }}">
        <img src="{{ '/' . ($article->featured_thumbnail ?? $article->featured_image) }}" alt="" loading="lazy" decoding="async">
        <b>{{ $article['title'] }}</b>
      </a>
      @endforeach
    </div>
    <p class="site-more"><a class="bm-btn bm-btn-secondary" href="/articles">All articles →</a></p>
  </div>
</section>

<!-- CTA -->
<section class="site-section site-final">
  <div class="bm-container">
    <h2>Tell us what you want to build</h2>
    <p>A 30-minute call is enough to see whether we're a good fit.</p>
    <a class="bm-btn bm-btn-primary bm-btn-lg" href="{{ $page->discovery_call_url }}" target="_blank" rel="noopener" data-cta="home-final">Book a call</a>
  </div>
</section>

@endsection
