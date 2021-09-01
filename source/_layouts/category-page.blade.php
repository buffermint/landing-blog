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

<section class="pt-8 pt-md-11 gradient-mint-to-white">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-9 col-xl-8 text-center">
        <h1 class="display-4">
          {{ $category->name }}
        </h1>
        <p class="lead mb-0 text-gray-700">
          {{ $category->description }}
        </p>
        <div class="border-bottom my-7"></div>
      </div>
    </div>
  </div>
</section>

<div class="min-vh-60">
  <div>
    @include("_partials.articles.blog", ['category' => $category, 'featuredPosts' => $featuredPosts, 'recentPosts' =>
    $recentPosts, 'category' =>
    $category])
  </div>
</div>
@endsection