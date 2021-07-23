<nav class="navbar navbar-expand-lg navbar-light py-6">
  <div class="container">

    <!-- Brand -->
    <a class="navbar-brand" href="/">

      <img src="{{ mix('img/logos/brand.svg', 'assets/build') }}" class="navbar-brand-img" alt="...">
    </a>

    <!-- Toggler -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapse -->
    <div class="collapse navbar-collapse" id="navbarCollapse">

      <!-- Toggler -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fe fe-x"></i>
      </button>

      <!-- Navigation -->
      <ul class="navbar-nav ml-auto">

        @foreach ($page->nav_menu as $name => $url)
        <li class="nav-item">
          <a class="nav-link {{ str_ends_with($page->getUrl(), $url) ? 'active' : '' }}" href="{{ $url }}" aria-haspopup="true" aria-expanded="false">
            {{ $name }}
          </a>
        </li>
        @endforeach

      </ul>

      <!-- Button -->
      <a class="navbar-btn btn btn-sm btn-primary lift ml-auto" href="{{ $page->discovery_call_url }}" target="_blank">
        Book a discovery call
      </a>

    </div>

  </div>
</nav>
