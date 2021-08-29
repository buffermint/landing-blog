@extends('_layouts.main')

@section('page-title', 'Home')

@section('content')

<!-- WELCOME
    ================================================== -->
<section class="mt-n12 scroll-section gradient-mint-to-white" id="sectionOne">
  <div class="container d-flex flex-column">
    @include("_partials/hero")
  </div> <!-- / .container -->
</section>

<div class="gradient-white-to-mint">
  <!-- PROCESS
      ================================================== -->
  <section id="what-we-do" class="pt-8 pt-md-11 scroll-section">
    <div class="container">
      <div class="row align-items-center justify-content-between">
        <div class="col-12 col-md-6">

          <!-- Preheading -->
          <h6 class="text-uppercase text-primary font-weight-bold">
            What we do?
          </h6>

          <!-- Heading -->
          <h2>
            We help founders launch and scale a high-quality MVP on a fixed budget.
          </h2>

          <!-- Text -->
          <p class="lead text-gray-800 mb-6 mb-md-0">
            We believe the best way to build a successful SaaS product in today's market is the lean startup approach.
          </p>

        </div>
        <div class="col-12 col-md-6 col-xl-5">

          <div class="row no-gutters">
            <div class="col-4">

              <!-- Image -->
              <div class="w-150 mt-9 p-1 bg-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1533901567451-7a6e68d6cd8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  class="img-fluid" alt="...">
              </div>

            </div>
            <div class="col-4">

              <!-- Image -->
              <div class="w-150 p-1 bg-white shadow-lg">
                <img src="{{ mix('/img/photos/mac.jpg', 'assets/build') }}" class="img-fluid" alt="Mac">
              </div>

            </div>
            <div class="col-4 position-relative">

              <!-- Image -->
              <div class="w-150 mt-11 float-right p-1 bg-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2063&q=80"
                  class="img-fluid" alt="...">
              </div>

            </div>
          </div> <!-- / .row -->

        </div>
      </div> <!-- / .row -->
    </div> <!-- / .container -->
  </section>

  <!-- STEPS
      ================================================== -->
  <section class="pt-8 pb-9 pt-md-11 pb-md-13">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4" data-aos-delay="50" data-aos="fade-left">
          <div class="row">
            <div class="col-auto col-md-12">

              <!-- Step -->
              <div class="row no-gutters align-items-center mb-md-5">
                <div class="col-auto">

                  <a href="#!" class="btn btn-sm btn-rounded-circle btn-gray-600 disabled opacity-1">
                    <span>1</span>
                  </a>

                </div>
                <div class="col">

                  <hr class="d-none d-md-block mr-n7 border-top-gray-400">

                </div>
              </div> <!-- / .row -->

            </div>
            <div class="col col-md-12 ml-n5 ml-md-0">

              <!-- Heading -->
              <h3>
                Brainstorm your MVP
              </h3>

              <!-- Text -->
              <p class="text-gray-600 mb-6 mb-md-0">
                In this step, we map out a version of your SaaS product with just enough features to be loved by early
                customers who can then provide feedback for future iterations.
              </p>

            </div>
          </div> <!-- / .row -->
        </div>
        <div class="col-12 col-md-4" data-aos-delay="300" data-aos="fade-left">
          <div class="row">
            <div class="col-auto col-md-12">

              <!-- Step -->
              <div class="row no-gutters align-items-center mb-md-5">
                <div class="col-auto">

                  <a href="#!" class="btn btn-sm btn-rounded-circle btn-gray-600 disabled opacity-1">
                    <span>2</span>
                  </a>

                </div>
                <div class="col">

                  <hr class="d-none d-md-block mr-n7 border-top-gray-400">

                </div>
              </div> <!-- / .row -->

            </div>
            <div class="col col-md-12 ml-n5 ml-md-0">

              <!-- Heading -->
              <h3>
                Design and Build
              </h3>

              <!-- Text -->
              <p class="text-gray-600 mb-6 mb-md-0">
                After the MVP is planned and approved by you, we design and develop the product. We keep you into the
                loop and utilize your domain knowledge through everyday feedback.
              </p>

            </div>
          </div> <!-- / .row -->
        </div>
        <div class="col-12 col-md-4" data-aos-delay="600" data-aos="fade-left">
          <div class="row">
            <div class="col-auto col-md-12">

              <!-- Step -->
              <div class="row no-gutters align-items-center mb-md-5">
                <div class="col-auto">

                  <a href="#!" class="btn btn-sm btn-rounded-circle btn-gray-600 disabled opacity-1">
                    <span>3</span>
                  </a>

                </div>
              </div> <!-- / .row -->

            </div>
            <div class="col col-md-12 ml-n5 ml-md-0">

              <!-- Heading -->
              <h3>
                Launch and Reiterate
              </h3>

              <!-- Text -->
              <p class="text-gray-600 mb-0">
                After launching the MVP, we help you to gain traction for your SaaS product using multiple channels. We
                work
                with you to collect user feedback and plan upcoming features and releases.
              </p>

            </div>
          </div> <!-- / .row -->
        </div>
      </div> <!-- / .row -->
    </div> <!-- / .container -->
  </section>
</div>

<section class="scroll-section gradient-mint-to-white">
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center min-vh-100 py-8 py-md-11">
      <div class="col-12 col-lg-10 col-xl-8">

        <!-- Blockquote -->
        <blockquote class="blockquote text-center">

          <!-- Logo -->
          <div class="img-fluid mb-5 mb-md-7 mx-auto svg-shim" style="max-width: 120px;">
            <a href="https://www.zenmindmap.com/">
              <img src="{{ mix('img/logos/zmm-logo.png', 'assets/build') }}" class="img-fluid" alt="Zen Mind Maps"
                style="max-height: 2.5rem;">
            </a>
          </div>

          <!-- Text -->
          <p class="h2 mb-5 mb-md-7">
            “BufferMint helped us launch two amazing products. Their thoughfulness, attitude and result oriented
            approach proves their credibility. They have been crucial to the success of our products.”
          </p>

          <!-- Footer -->
          <footer class="blockquote-footer mb-0">
            <div class="avatar mr-3">
              <img src="{{ mix('img/photos/nick.png', 'assets/build') }}" class="avatar-img rounded-circle" alt="...">
            </div> <span class="h6 text-uppercase">Nick Hoang</span>
          </footer>

        </blockquote>

      </div>
    </div>
  </div>
</section>


<!-- PRICING
    ================================================== -->
<section class="py-4 py-md-8 gradient-white-to-mint" id="pricing">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 text-center mb-7 mb-md-9">
        <!-- Heading -->
        <h2 class="display-3">
          Fair, fixed pricing for all.
        </h2>

        <!-- Text -->
        <p class="lead text-gray-800">
          Every founder needs to juggle and second guess a thousand things. We make sure our pricing isn't one of them.
        </p>
      </div>
    </div> <!-- / .row -->
    <div class="row align-items-center no-gutters">
      <div class="col-12 col-md-6">

        <!-- Card -->
        <div class="card rounded-lg shadow-lg mb-6 mb-md-0" style="z-index: 1;" data-aos="fade-up">

          <!-- Body -->
          <div class="card-body py-6 py-md-8">
            <div class="row justify-content-center">
              <div class="col-12 col-xl-9">

                <!-- Badge -->
                <div class="text-center mb-5">
                  <span class="badge badge-pill badge-primary-soft">
                    <span class="h6 font-weight-bold text-uppercase">MVP</span>
                  </span>
                </div>

                <!-- Price -->
                <div class="d-flex justify-content-center">
                  <span class="h2 mb-0 mt-2">$</span>
                  <span class="price display-2 mb-0" data-annual="29" data-monthly="49">7500</span>
                  <span class="h2 align-self-start mb-1">*</span>
                </div>

                <!-- Features -->
                <div class="d-flex">

                  <!-- Check -->
                  <div class="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
                    <i class="fe fe-check"></i>
                  </div>

                  <!-- Text -->
                  <p>
                    Plan to launch in 45 days
                  </p>

                </div>
                <div class="d-flex">

                  <!-- Check -->
                  <div class="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
                    <i class="fe fe-check"></i>
                  </div>

                  <!-- Text -->
                  <p>
                    Brainstorming, design and development
                  </p>

                </div>
                <div class="d-flex">

                  <!-- Check -->
                  <div class="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
                    <i class="fe fe-check"></i>
                  </div>

                  <!-- Text -->
                  <p>
                    Minimal and functional UI
                  </p>

                </div>
                <div class="d-flex">

                  <!-- Check -->
                  <div class="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
                    <i class="fe fe-check"></i>
                  </div>

                  <!-- Text -->
                  <p>
                    Admin Dashboard
                  </p>

                </div>
              </div>
            </div> <!-- / .row -->
          </div>

          <!-- Button -->
          <div class="d-flex pricing-cta">
            <!-- <a href="#!" class="btn btn-block btn-lg btn-gray-700 custom-card-btn custom-card-btn-left">
                  Learn more
                </a> -->
            <hr>
            <a href="{{ $page->discovery_call_url }}" target="_blank"
              class="btn btn-block btn-lg btn-primary custom-card-btn custom-card-btn-right">
              <span class="d-none d-lg-block">Book a discovery call</span>
              <span class="d-lg-none">Book a call</span>
            </a>
          </div>


        </div>

      </div>
      <div class="col-12 col-md-6 ml-md-n3">

        <!-- Card -->
        <div class="card rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">

          <!-- Body -->
          <div class="card-body py-6 py-md-8">
            <div class="row justify-content-center">
              <div class="col-12 col-xl-10">

                <!-- Badge -->
                <p class="text-center mb-4 mb-md-6">
                  <span class="badge badge-pill badge-primary-soft">
                    <span class="h6 font-weight-bold text-uppercase">COMPLETE PRODUCT</span>
                  </span>
                </p>

                <!-- Text -->
                <p class="lead text-center text-muted mb-0 mb-md-10">
                  Even though we don't recommend building a full feature-rich SaaS product without going to market for
                  everyone, you may have market research or insight that shows otherwise.
                  <br><br>

                  <a href="{{ $page->discovery_call_url }}" target="_blank">
                    <strong class="text-muted">Let's talk about it.</strong>
                  </a>
                </p>

              </div>
            </div> <!-- / .row -->
          </div>

          <!-- Button -->
          <!-- <a href="#!" class="card-btn btn btn-block btn-lg btn-light bg-gray-300 text-gray-800">
                Contact us
              </a> -->

        </div>

      </div>
    </div> <!-- / .row -->
  </div> <!-- / .container -->
</section>

<section class="scroll-section gradient-mint-to-white">
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center min-vh-100 py-8 py-md-11">
      <div class="col-12 col-lg-10 col-xl-8">

        <!-- Blockquote -->
        <blockquote class="blockquote text-center">

          <!-- Logo -->
          <div class="img-fluid mb-5 mb-md-7 mx-auto svg-shim" style="max-width: 120px;">
            <a href="https://www.shasilluminated.org/">
              <img src="{{ mix('/img/logos/shas-logo.png', 'assets/build') }}" class="img-fluid" alt="Shas Illuminated"
                style="max-height: 5rem;">
            </a>
          </div>

          <!-- Text -->
          <p class="h2 mb-5 mb-md-7">
            “BufferMint is a wonderful agency for both design and development. They have been the perfect partner for
            Shas Illuminated. They are a pleasure to work with and I recommend them highly for anyone that wants a
            beautiful web application.”
          </p>

          <!-- Footer -->
          <footer class="blockquote-footer mb-0">
            <div class="avatar mr-3">
              <img src="{{ mix('img/photos/yacov.jpeg', 'assets/build') }}" class="avatar-img rounded-circle" alt="...">
            </div> <span class="h6 text-uppercase">Yacov Metz</span>
          </footer>

        </blockquote>

      </div>
    </div>
  </div>
</section>

<section id="blogSection" class="scroll-section">
  <div class="container d-flex flex-column">
    <h2 class="display-3 mb-7 mb-md-9 text-center">
      Latest Insights
    </h2>
    <blog :post-count="3" :gallery-mode="true"></blog>
  </div>
</section>

<!-- CTA
    ================================================== -->
<section id="discoverySection" class="scroll-section gradient-white-to-mint">
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center min-vh-100 py-8 py-md-11">
      <div class="col-12 col-md-9 col-lg-8 col-xl-7 text-center">

        <!-- Heading -->
        <h2 class="display-3">Are you a founder with an amazing idea?</h2>

        <!-- Text -->
        <p class="mb-5 font-size-lg text-gray-800">
          We love to work with first-time founders and with at least 3 years of experience in their industry. Let us
          help you launch an exceptional SaaS product.
        </p>

        <!-- Button -->
        <a class="btn btn-primary rounded-pill" href="{{ $page->discovery_call_url }}" target="_blank">
          Book a discovery call <i class="fe fe-arrow-right ml-2"></i>
        </a>

      </div>
    </div>
  </div>
</section>

@endsection