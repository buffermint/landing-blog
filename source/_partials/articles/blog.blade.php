@php
    $allPosts = collect([]);
    foreach($page->getCollectionNames() as $collectionName){
        $allPosts = $allPosts->merge(${$collectionName});
    }

    $featuredPosts = $allPosts->filter(function($post){
        return $post->featured;
    });

    $recentPosts = $allPosts->filter(function($post){
        return !$post->featured;
    });
@endphp

<section>
    <div class="container pt-6">
        <h2 class="mb-0">
            Featured Articles
          </h2>
          <p class="mb-5 text-muted">Not sure where to start? Here is the list of our best articles hand-picked for you.</p>
        <div class="row">
            <div class="col-12">

                @foreach ($featuredPosts as $key => $post)
                @include('_partials.articles.feature-card', [
                'post' => $post,
                'is_left' => array_search($key ,array_keys($allPosts->toArray())) % 2 === 0
                ])
                @endforeach

            </div>
        </div> <!-- / .row -->

        <div class="pt-7 pt-md-10">
            <h2 class="mb-0">
                Recent Articles
              </h2>
              <p class="mb-5 text-muted">Our latest articles across all tags.</p>
            <div class="row">
                @foreach ($recentPosts->take(6) as $article)
                <div class="col-12 col-md-6 col-lg-4 d-flex">
                    @include('_partials.articles.article-card', ['article' => $article])
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

<div class="mb-6">
    <newsletter :borderBottom="false"></newsletter>
</div>

<div class="container">
    <div class="row pb-8 pb-md-11">
        @foreach ($recentPosts->skip(6)->take(6) as $article)
        <div class="col-12 col-md-6 col-lg-4 d-flex">
            @include('_partials.articles.article-card', ['article' => $article])
        </div>
        @endforeach
    </div>
</div>