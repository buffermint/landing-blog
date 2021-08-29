@php
$selectedCollection = $article->category ? $page->categories[$article->category] : null;
@endphp
<!-- Card -->
<div class="card mb-6 shadow-light-lg lift lift-lg article-card">
  @if (count($category) === 0 && $selectedCollection && $selectedCollection->name)
  <a href="/{{ $selectedCollection['slug'] }}">
    <span class="badge badge-pill badge-gray-600 badge-float badge-float-outside">
      <span class="h6">
        {{ $selectedCollection->name }}
      </span>
    </span>
  </a>
  @endif



  <!-- Image -->
  <a class="card-img-top" href="{{ $article->getUrl() }}">
    <!-- Image -->
    <img src="{{ '/' . $article['featured_image'] }}" alt="{{ $article['title'] }}" class="card-img-top" />
  </a>

  <!-- Body -->
  <a class="card-body" href="{{ $article->getUrl() }}">
    <h3>{{ $article['title'] }}</h3>
  </a>

  <!-- Meta -->
  <a class="card-meta mt-auto" href="#!">
    <!-- Divider -->
    <hr class="card-meta-divider" />

    <!-- Author -->
    <h6 class="text-uppercase text-muted mr-2 mb-0">{{ $article['author'] }}</h6>

    <!-- Date -->
    <p class="h6 text-uppercase text-muted mb-0 ml-auto">
      <time datetime="2019-05-02">{{ gmdate("d M Y", $article['date']) }}</time>
    </p>
  </a>
</div>