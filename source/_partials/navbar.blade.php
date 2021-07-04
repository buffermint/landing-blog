<nav class="navbar navbar-expand-lg navbar-light">
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
        <li class="nav-item">
          <a class="nav-link" href="/#what-we-do" aria-haspopup="true" aria-expanded="false">
            What we do?
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#pricing" aria-haspopup="true" aria-expanded="false">
            Pricing
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/careers" aria-haspopup="true" aria-expanded="false">
            Careers
          </a>
        </li>
        {{-- <li class="nav-item">
          <a class="nav-link" href="/blog" aria-haspopup="true" aria-expanded="false">
            Blog
          </a>
        </li> --}}
        <li class="nav-item">
          <a class="nav-link" href="/contact-us" aria-haspopup="true" aria-expanded="false">
            Contact
          </a>
        </li>
      </ul>

      <!-- Button -->
      <a class="navbar-btn btn btn-sm btn-primary lift ml-auto" href="https://calendly.com/buffermint/30min" target="_blank">
        Book a discovery call
      </a>

    </div>

  </div>
</nav>
