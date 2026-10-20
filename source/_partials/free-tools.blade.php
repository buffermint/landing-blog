@php $tools = collect($page->brand->products)->firstWhere('id', 'tools'); @endphp
<section id="free-tools" class="pt-8 pt-md-11 pb-8 pb-md-11 scroll-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 text-center mb-7 mb-md-9">
        <!-- Preheading -->
        <p class="h6 text-uppercase text-primary font-weight-bold">
          {{ $tools->name }}
        </p>

        <!-- Heading -->
        <h2 class="display-3">
          Free tools that run in your browser.
        </h2>

        <!-- Text -->
        <p class="lead text-gray-800">
          {{ $page->brand->pitch->tools }}
        </p>
      </div>
    </div> <!-- / .row -->

    <div class="row">
      @foreach ($tools->highlights as $highlight)
      <div class="col-12 col-md-6 col-lg-4 d-flex mb-6">
        <a class="card shadow-light-lg lift lift-lg w-100 text-reset" href="{{ $highlight->href }}">
          <div class="card-body">
            <h3 class="h4 mb-2 text-primary">
              {{ $highlight->label }} <i class="fe fe-arrow-right ml-1"></i>
            </h3>
            <p class="text-gray-800 mb-0">
              {{ $highlight->description }}
            </p>
          </div>
        </a>
      </div>
      @endforeach
    </div> <!-- / .row -->

    <div class="text-center">
      <a class="btn btn-primary lift" href="/tools/">
        See all {{ $tools->name }}
      </a>
    </div>
  </div> <!-- / .container -->
</section>
