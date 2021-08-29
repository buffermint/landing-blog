@php
$category = $page->categories[$category_key];
@endphp

@extends('_layouts.main')

@section('page-title', $category['name'])

@section('content')

<div class="bg-gray-300">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a class="text-gray-700" href="/">
              Home
            </a>
          </li>
          <li class="breadcrumb-item">
            <a class="text-gray-700" href="/articles">
              Blog
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $category['name'] ?? "Category Name" }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</div>
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
  <div>
    @include("_partials.articles.blog", ['featuredPosts' => $featuredPosts, 'recentPosts' => $recentPosts, 'category' =>
    $category])
  </div>
</div>
@endsection