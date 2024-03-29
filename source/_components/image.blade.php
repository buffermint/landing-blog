<section class="pt-6 pt-md-8">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 {{ isset($wide) && $wide ? '' : 'col-md-10 col-lg-9 col-xl-8' }}">
                <figure class="figure mb-7 text-center">
                    <img class="figure-img img-fluid rounded" src="{{ $url }}" alt="{{ $alt ?? $caption ?? 'Post Image' }}">

                    @if (isset($caption))
                    <figcaption class="figure-caption text-center">
                        {{ $caption }}
                    </figcaption>
                    @endif
                </figure>
            </div>
        </div> <!-- / .row -->
    </div> <!-- / .container -->
</section>