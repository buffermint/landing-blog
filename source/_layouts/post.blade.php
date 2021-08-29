@extends('_layouts.main')
@section('content')
<link rel="stylesheet" href="{{ mix('css/posts.css', 'assets/build') }}">
<div id="blog-scroll-position"></div>
<div class="pb-6 mb-6">
    @if ($page->featured_image)
    <section data-jarallax data-speed=".8" class="py-12 py-md-15 bg-cover jarallax"
        style="background-image: url(/{{ $page->featured_image }});"></section>
    @endif

    <section class="pt-8 pt-md-11 gradient-mint-to-white">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-9 col-xl-8 text-center">

                    <!-- Heading -->
                    <h1 class="display-4">
                        {{ $page->title }}
                    </h1>


                    @if ($page->excerpt)
                    <p class="lead mb-0 text-gray-700">
                        {{ $page->excerpt }}
                    </p>
                    @endif


                    <a class="pt-4 d-block" href="/">
                        <span class="badge badge-pill badge-gray-600"><span class="h6">Idea Generation</span></span>
                    </a>

                    <div class="mb-7"></div>

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
                        <div class="col-auto d-flex flex-column">
                            <x-share-social url="{{ $page->getUrl() }}" title="{{ $page->title }}" />
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
                    <x-share-social url="{{ $page->getUrl() }}" title="{{ $page->title }}" />
                </div>
                @endif
            </div> <!-- / .row -->
            <newsletter :dark-mode="false"></newsletter>

            <div class="text-center">
                <h2 class="mb-0 mt-2">
                    Suggested Articles
                </h2>
                <p class="mb-5 font-size-lg text-gray-800 px-sm-4 px-md-6 px-lg-10">
                    Here are a few more articles you might like.
                </p>
                <div class="row">
                    @php
                        $related = $posts->filter(function($post) use($page){
                            return $post->title !== $page->title;
                        });
                        $catPosts = $related->where('category', $page->category);
                        if($catPosts->count() < 3){
                            $related = $catPosts->merge($related);
                        }
                    @endphp
                    @foreach ($related->take(3) as $article)
                    <div class="col-12 col-md-6 col-lg-4 d-flex">
                        @include('_partials.articles.article-card', ['article' => $article, 'category' => []])
                    </div>
                    @endforeach
                </div>
            </div>
        </div> <!-- / .container -->
    </section>
</div>

@push('scripts')
<script src="{{ mix('js/posts.js', 'assets/build') }}"></script>
@endpush

@endsection