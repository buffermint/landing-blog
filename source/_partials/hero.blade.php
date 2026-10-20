<div class="row align-items-center justify-content-center min-vh-100 py-8 py-md-11 hero-section">
  <div class="col-12 col-md-10 col-lg-9 mt-auto text-center">

    <!-- Heading -->
    <h1 class="display-2 fw-bold mb-0">
      We make the best tools for the <strong class="text-primary">browser</strong> and the
      <strong class="text-primary">internet</strong>.
    </h1>

    <div class="pt-4 mt-6 mb-0">
      <p class="h3 text-gray-800">
        {{ $page->brand->pitch->tools }}
        <br class="d-none d-md-block">
        {{ $page->brand->pitch->studio }}
      </p>
    </div>

    <div class="mt-7">
      <a class="btn btn-primary lift mr-md-3 mb-3 mb-md-0" href="/tools/">
        Browse the free tools <i class="fe fe-arrow-right ml-2"></i>
      </a>
      <a class="btn btn-outline-primary lift" href="{{ $page->brand->cta->href }}" target="_blank" rel="noopener">
        {{ $page->brand->cta->label }}
      </a>
    </div>

  </div>
  <div class="col-12 mt-auto text-center">

    <!-- Button -->
    <a class="btn btn-primary btn-rounded-circle shadow" data-scroll="{&quot;offset&quot;: 0}" href="#free-tools"
      aria-label="Scroll to the free tools">
      <i class="fe fe-arrow-down"></i>
    </a>

  </div>
</div>
