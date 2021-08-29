@php
$category = $page->categories[$category_key];
@endphp

@extends('_layouts.main')

@section('page-title', $category['name'])

@section('content')

@php
$allPosts = $posts->filter(function($post) use($category_key){
return $post->category === $category_key;
});

$featuredPosts = $allPosts->filter(function($post){
return $post->featured;
});

$recentPosts = $allPosts->filter(function($post){
return !$post->featured;
});
@endphp

<div class="gradient-mint-to-white min-vh-60">
  <div class="container py-6 text-center">
    <h1 class="display-4">
      {{ $category->name }}
    </h1>

    <p class="lead text-gray-700 px-sm-4">
        {{ $category->description }}
    </p>
  </div>
  <div>
    @include("_partials.articles.blog", ['category' => $category, 'featuredPosts' => $featuredPosts, 'recentPosts' => $recentPosts, 'category' =>
    $category])
  </div>
</div>
@endsection