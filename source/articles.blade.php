@extends('_layouts.main')

@section('page-title', 'Blog')
@section('page-description', 'Articles for SaaS founders on idea validation, MVPs, micro-SaaS and launching a startup.')

@section('content')

@php
$featuredPosts = $posts->filter(function($post){
return $post->featured;
});

$recentPosts = $posts->filter(function($post){
return !$post->featured;
});
@endphp

<div class="gradient-mint-to-white min-vh-60">
    <h1 class="sr-only">BufferMint Blog</h1>
    <Search></Search>

    <div class="container">

        <div class="row align-items-center">
            <div class="col-auto">

                <!-- Heading -->
                <p class="h6 fw-bold text-uppercase text-muted mb-0">
                    Tags:
                </p>

            </div>
            <div class="col ms-n5">
                @foreach ($page->categories as $collection)
                <a href="/{{ $collection['slug'] }}"><span
                        class="badge badge-pill badge-gray-600"><span class="h6 text-uppercase category-pill">
                            {{ $collection['name'] }}
                        </span></span></a>
                @endforeach

            </div>
        </div>
    </div>

    <div class="pt-6">
        @include("_partials.articles.blog", ['featuredPosts' => $featuredPosts, 'recentPosts' => $recentPosts])
    </div>
</div>
</div>
@endsection