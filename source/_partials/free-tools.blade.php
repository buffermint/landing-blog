@php
  $tools = collect($page->brand->products)->firstWhere('id', 'tools');
  // one stroke icon per highlighted category, keyed by its link
  $icons = [
    '/tools/pdf/' => '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    '/tools/photo/' => '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
    '/tools/media/' => '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
    '/tools/dev/' => '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14"/>',
    '/tools/seo/' => '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
    '/tools/business/' => '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  ];
@endphp
<section class="site-section" id="tools">
  <div class="bm-container">
    <div class="site-head">
      <h2>Free tools for everyday work</h2>
      <p>{{ $page->brand->toolCount }} tools for PDFs, images, video, code, SEO and business. Nothing to install, no account, and your files stay on your device.</p>
    </div>
    <div class="site-cards">
      @foreach ($tools->highlights as $highlight)
      <a class="site-card" href="{{ $highlight->href }}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{!! $icons[$highlight->href] ?? '' !!}</svg>
        <b>{{ $highlight->label }}</b>
        <span>{{ $highlight->description }}</span>
      </a>
      @endforeach
    </div>
    <p class="site-more"><a class="bm-btn bm-btn-secondary" href="/tools/" data-cta="home-all-tools">See all {{ $page->brand->toolCount }} tools →</a></p>
  </div>
</section>
