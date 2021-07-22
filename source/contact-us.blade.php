@extends('_layouts.main')


@section('content')


<section
      class="mt-n10 scroll-section gradient-mint-to-white"
      id="sectionOne"
    >
      <div class="container d-flex flex-column">
        <div
          class="
            row
            align-items-center
            justify-content-center
            min-vh-100
            py-8 py-md-11
          "
        >
          <div class="col-12 col-md-8 col-lg-7 mt-auto text-center">
            <!-- Heading -->
            <h1 class="display-2 mb-0 font-weight-bold">
              Small Team, Big heart
            </h1>

            <p class="lead text-gray-800 mt-4">
              We are a small team of remote developers and founders, each of us
              seasoned in their own field. Our preferred means to start a
              conversation is by
              <a href="{{ $page->discovery_call_url }}" target="_blank"
                ><strong>booking a discovery call</strong></a
              >. <br /><br />
              You can always reach us using the conventional means.
            </p>
          </div>
          <div class="row">
          <div class="col-12 col-md-4 text-center">
            <!-- Heading -->
            <h6 class="text-uppercase text-gray-800 mb-1">Message us</h6>

            <!-- Link -->
            <div class="mb-5 mb-md-0">
              <a href="https://wa.me/917767074808" class="h4 text-primary">
                Start a chat!
              </a>
            </div>
          </div>
          <div
            class="col-12 col-md-4 text-center border-left-md border-gray-300"
          >
            <!-- Heading -->
            <h6 class="text-uppercase text-gray-800 mb-1">Call anytime</h6>

            <!-- Link -->
            <div class="mb-5 mb-md-0">
              <a href="tel:917767074808" class="h4"> (91) 7767074808 </a>
            </div>
          </div>
          <div
            class="col-12 col-md-4 text-center border-left-md border-gray-300"
          >
            <!-- Heading -->
            <h6 class="text-uppercase text-gray-800 mb-1">Email us</h6>

            <!-- Link -->
            <a href="mailto:sales@buffermint.com" class="h4"> sales@buffermint.com </a>
          </div>
        </div>
      </div>
        <!-- / .row -->
      </div>
      <!-- / .container -->
    </section>

@endsection