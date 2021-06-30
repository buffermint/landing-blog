@extends('_layouts.main')
@section('content')


<section class="mt-n10 scroll-section gradient-mint-to-white" id="sectionOne">
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center min-vh-100 py-8 py-md-11">
      <div class="col-12 col-md-8 col-lg-7 mt-auto text-center">

        <!-- Heading -->
        <h1 class="display-2 mb-0 font-weight-bold">
          Want to <span class="text-primary">work</span> at BufferMint?
        </h1>

        <p class="lead text-gray-800 mt-4">
          We empower people to innovate and collaborate openly. We believe in adding individual brilliance to each product we deliver, and we do that as a team.
        </p>

      </div>
      <div class="col-12 mt-auto"></div>
    </div> <!-- / .row -->
  </div> <!-- / .container -->
</section>

<section class="gradient-white-to-mint">
  <div class="container">
    <div class="row align-items-center justify-content-between min-vh-100">
      <div class="col-12 col-md-6">

        <!-- Badge -->
        <h6 class="text-uppercase text-primary font-weight-bold">
          Values
        </h6>

        <!-- Heading -->
        <h2>
          We care a lot about the customer, <br>
          <span class="text-primary">but employees are first</span>.
        </h2>

        <!-- Text -->
        <p class="font-size-lg text-gray-800 mb-6 mb-md-0">
          <!-- <strong class="text-dark font-size-lg">“Do what you can. Do the best you can”.</strong> -->
          <br>
          We are a tight-knit community of dedicated individuals set to craft a unique digital experience for every project. Our all-around and talented team will ensure that our solutions align with your business goals, delight your users, and deliver unique value to your business.
          <br><br>
          If you can bring your effulgence to meet or exceed what everyone else around you is doing, then we’d like to get in touch with you.
        </p>

      </div>
      <div class="col-12 col-md-6 col-xl-5">

        <div class="row no-gutters">
          <div class="col-4">

            <!-- Image -->
            <div class="w-150 mt-9 p-1 bg-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1506784926709-22f1ec395907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1948&q=80" class="img-fluid" alt="...">
            </div>

          </div>
          <div class="col-4">

            <!-- Image -->
            <div class="w-150 p-1 bg-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80" class="img-fluid" alt="...">
            </div>

          </div>
          <div class="col-4 position-relative">

            <!-- Image -->
            <div class="w-150 mt-11 float-right p-1 bg-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="img-fluid" alt="...">
            </div>

          </div>
        </div> <!-- / .row -->

      </div>
    </div> <!-- / .row -->
  </div> <!-- / .container -->
</section>


<section class="pt-6 pt-md-8 gradient-mint-to-white">
  <div class="container pb-8 pb-md-11 border-bottom border-gray-300">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 text-center">

        <!-- Badge -->
        <span class="badge badge-pill badge-primary-soft mb-3">
          <span class="h6 text-uppercase">Applying</span>
        </span>

        <!-- Heading -->
        <h2>
          Let’s find you an <span class="text-primary">open position</span>.
        </h2>

        @include('_partials.workable')

      </div>
    </div> <!-- / .row -->
  </div> <!-- / .container -->
</section>

@endsection
