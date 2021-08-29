@php
$selectedCollection = $post->category ? $page->categories[$post->category] : null;
@endphp
<div class="card card-row shadow-light-lg mb-6">
    <div class="row no-gutters">
        <div class="col-12">
            @if (count($category) === 0 && $selectedCollection && $selectedCollection->name)
            <a href="/{{ $selectedCollection['slug'] }}">
                <span class="badge badge-pill badge-gray-600 badge-float badge-float-outside">
                    <span class="h6 text-uppercase category-pill">
                    {{ $selectedCollection->name }}
                    </span>
                </span>
            </a>
            @endif
        </div>
        <a class="col-12 col-md-6 bg-cover {{ $is_left ? 'order-md-2 card-img-end' : 'order-md-1 card-img-start'  }}"
            style="background-image: url(/{{ $post['featured_image'] }});" href="{{ $post->getUrl() }}">

            <!-- Image (placeholder) -->
            <img src="/{{ $post['featured_image'] }}" alt="{{ $post->title }}" class="img-fluid d-md-none invisible">

            @if ($is_left)
            <div class="shape shape-left shape-fluid-y svg-shim text-white d-none d-md-block">
                <svg viewBox="0 0 112 690" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h62.759v172C38.62 384 112 517 112 517v173H0V0z" fill="currentColor" /></svg>
            </div>
            @else
            <div class="shape shape-right shape-fluid-y text-white d-none d-md-block">
                <svg viewBox="0 0 112 690" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M116 0H51v172C76 384 0 517 0 517v173h116V0z" fill="currentColor"></path>
                </svg> </div>
            @endif

        </a>
        <div class="col-12 col-md-6 {{ $is_left ? 'order-md-1' : 'order-md-2'  }}">

            <!-- Body -->
            <a class="card-body" href="{{ $post->getUrl() }}">

                <!-- Heading -->
                <h3>
                    {{ $post->title }}
                </h3>

                <!-- Text -->
                <p class="mb-0 text-muted">
                    {{ $post->excerpt }}
                </p>

            </a>

            <!-- Meta -->
            <div class="card-meta">

                <!-- Divider -->
                <hr class="card-meta-divider">

                <!-- Author -->
                <h6 class="text-uppercase text-muted mr-2 mb-0">
                    {{ $post->author }}
                </h6>

                <!-- Date -->
                <p class="h6 text-uppercase text-muted mb-0 ml-auto">
                    <time datetime="2019-05-31">
                        {{ gmdate("d M Y", $post->date) }}
                    </time>
                </p>

            </div>

        </div>

    </div> <!-- / .row -->
</div>