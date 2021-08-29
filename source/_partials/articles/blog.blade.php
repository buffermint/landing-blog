@php
     $category = $category ?? [];
@endphp
<section>
    <div class="container pt-6">
        @if ($featuredPosts && count($featuredPosts) > 0)
        <div class="pb-7 pb-md-10">

            <h2 class="mb-0">
                {{ $category['featured_heading'] ?? $page->default_featured_headline}}
            </h2>
            <p class="mb-5 text-muted">
                {{ $category['featured_heading'] ?? $page->default_featured_tagline}}
            </p>

            <div class="row">
                <div class="col-12">
                    @foreach ($featuredPosts as $key => $post)
                    @include('_partials.articles.feature-card', [
                    'post' => $post,
                    'is_left' => array_search($key ,array_keys($featuredPosts->toArray())) % 2 === 0
                    ])
                    @endforeach
                </div>
            </div> <!-- / .row -->
        </div>

        @endif

        @if ($recentPosts && count($recentPosts) > 0)
        <div>
            <h2 class="mb-0">
                {{ $category['recent_heading'] ?? $page->default_recent_headline}}
            </h2>
            <p class="mb-5 text-muted">
                {{ $category['recent_heading'] ?? $page->default_recent_tagline}}
            </p>
            <div class="row">
                @foreach ($recentPosts->take(6) as $article)
                <div class="col-12 col-md-6 col-lg-4 d-flex">
                    @include('_partials.articles.article-card', ['article' => $article])
                </div>
                @endforeach
            </div>
        </div>
        @endif
    </div>
</section>

<div class="mb-6">
    <newsletter :borderBottom="false"></newsletter>
</div>

@php
$postsList = $recentPosts->skip(6)->take(6)
@endphp

@if ($postsList && count($postsList) > 0)
<div class="container">
    <div class="row pb-8 pb-md-11">
        @foreach ($postsList as $article)
        <div class="col-12 col-md-6 col-lg-4 d-flex">
            @include('_partials.articles.article-card', ['article' => $article])
        </div>
        @endforeach
    </div>
</div>
@endif