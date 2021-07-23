@extends('_layouts.main')
@section('content')
<link rel="stylesheet" href="{{ mix('css/posts.css', 'assets/build') }}">
<div id="blog-scroll-position"></div>
<div class="pb-6 mb-6">
    @if ($page->featured_image)
    <section data-jarallax data-speed=".8" class="py-12 py-md-15 bg-cover jarallax"
        style="background-image: url({{ $page->featured_image }});"></section>
    @endif

    <section class="pt-8 pt-md-11 gradient-mint-to-white">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-9 col-xl-8">

                    <!-- Heading -->
                    <h1 class="display-4 text-center">
                        {{ $page->title }}
                    </h1>


                    @if ($page->excerpt)
                    <p class="lead mb-7 text-center text-gray-700">
                        {{ $page->excerpt }}
                    </p>
                    @endif

                    <!-- Meta -->
                    @if ($page->show_meta ?? true)
                    <div class="row align-items-center py-5 border-top border-bottom">

                        <div class="col d-flex">

                            @if ($page->author_image)
                            <div class="mr-4">
                                <div class="avatar avatar-lg">
                                    <img src="{{ $page->author_image }}" alt="..." class="avatar-img rounded-circle">
                                </div>
                            </div>
                            @endif

                            <!-- Name -->
                            <div>
                                <h6 class="text-uppercase mb-0">
                                    {{ $page->author }}
                                </h6>

                                <!-- Date -->
                                <time class="font-size-sm text-muted" datetime="2019-05-20">
                                    Published on {{ date('F j, Y', $page->date) }}
                                </time>
                            </div>
                        </div>
                        <div class="col-auto">

                            <!-- Share -->
                            <span class="h6 text-uppercase text-muted d-none d-md-inline mr-4">
                                Share:
                            </span>

                            <!-- Icons -->
                            <ul class="d-inline list-unstyled list-inline list-social">
                                <li class="list-inline-item list-social-item mr-3">
                                    <a href="https://www.facebook.com/sharer.php?u={{ $page->getUrl() }}"
                                        class="text-decoration-none">
                                        <img src="{{ mix('img/social/facebook.svg', 'assets/build') }}"
                                            class="list-social-icon" alt="Share on Facebook">
                                    </a>
                                </li>
                                <li class="list-inline-item list-social-item mr-3">
                                    <a href="https://twitter.com/share?url={{  $page->getUrl() }}&text={{ $page->title }}&hashtags=buffermint"
                                        class="text-decoration-none">
                                        <img src="{{ mix('img/social/twitter.svg', 'assets/build') }}"
                                            class="list-social-icon" alt="Share on Twitter">
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                    @else
                    <div class="border-bottom"></div>
                    @endif

                </div>
            </div> <!-- / .row -->
        </div> <!-- / .container -->
    </section>

    @if ($page->hero_image)
    <section class="pt-6 pt-md-8">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-9 col-xl-8">
                    <figure class="figure mb-7">
                        <img class="figure-img img-fluid rounded lift lift-lg" src="{{ $page->hero_image }}"
                            alt="{{ $page->hero_image_caption ?? 'Hero Image' }}">

                        @if ($page->hero_image_caption)
                        <figcaption class="figure-caption text-center">
                            {{ $page->hero_image_caption }}
                        </figcaption>
                        @endif
                    </figure>
                </div>
            </div> <!-- / .row -->
        </div> <!-- / .container -->
    </section>
    @endif

    <section class="pt-6 pt-md-8">
        <div class="container" id="post-container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-9 col-xl-8" id="post-content">

                    @yield('postContent')

                </div>
                @if ($page->show_meta ?? true)
                <div class="col-12 text-center py-4">

                    <hr>
                    <!-- Share -->
                    <span class="h6 text-uppercase text-muted d-none d-md-inline mr-4">
                        Share:
                    </span>

                    <!-- Icons -->
                    <ul class="d-inline list-unstyled list-inline list-social">
                        <li class="list-inline-item list-social-item mr-3">
                            <a href="https://www.facebook.com/sharer.php?u={{ $page->getUrl() }}"
                                class="text-decoration-none">
                                <img src="{{ mix('img/social/facebook.svg', 'assets/build') }}"
                                    class="list-social-icon" alt="Share on Facebook">
                            </a>
                        </li>
                        <li class="list-inline-item list-social-item mr-3">
                            <a href="https://twitter.com/share?url={{  $page->getUrl() }}&text={{ $page->title }}&hashtags=buffermint"
                                class="text-decoration-none">
                                <img src="{{ mix('img/social/twitter.svg', 'assets/build') }}"
                                    class="list-social-icon" alt="Share on Twitter">
                            </a>
                        </li>
                    </ul>

                </div>
                @endif
            </div> <!-- / .row -->
        </div> <!-- / .container -->
    </section>
</div>
<script src="{{ mix('js/posts.js', 'assets/build') }}"></script>
@endsection