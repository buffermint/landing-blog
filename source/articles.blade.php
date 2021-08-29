@extends('_layouts.main')

@section('page-title', 'Blog')

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
    <Search></Search>

    @foreach ($page->categories as $collection)
    <div class="container">
        <a class="mr-2" href="/{{ $collection['slug'] }}">
            <span class="badge badge-pill badge-gray-600"><span class="h5">{{ $collection['name'] }}</span></span>
        </a>
    </div>
    @endforeach

    @include("_partials.articles.blog", ['featuredPosts' => $featuredPosts, 'recentPosts' => $recentPosts])
</div>
</div>
@endsection