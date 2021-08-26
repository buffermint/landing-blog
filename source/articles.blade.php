@extends('_layouts.main')

@section('page-title', 'Blog')

@section('content')
<div class="gradient-mint-to-white min-vh-60">
  <div>
      <Search></Search>
      @include("_partials.articles.blog", ['posts' => $posts])
  </div>
</div>
@endsection