<footer class="py-8 py-md-11 bg-dark">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-4 col-lg-3">

                <!-- Brand -->

                <img src="/brand/logos/logo-on-dark.svg" class="footer-brand img-fluid mb-2 mt-0"
                     alt="{{ $page->brand->name }}" width="258" height="49">

                <!-- Text -->
                <p class="text-gray-500 mb-2">
                    {{ $page->brand->tagline }}
                </p>
                <p class="text-gray-600 small mb-2">
                    {{ $page->brand->legalName }}
                </p>

                <!-- Social -->
                <ul class="list-unstyled list-inline list-social mb-6 mb-md-0">
                    <li class="list-inline-item list-social-item mr-3">
                        <a href="{{ $page->brand->social->facebook }}" class="text-decoration-none">
                            <img src="{{ mix('img/social/facebook.svg', 'assets/build') }}" class="list-social-icon"
                                 alt="BufferMint on Facebook">
                        </a>
                    </li>
                    <li class="list-inline-item list-social-item mr-3">
                        <a href="{{ $page->brand->social->x }}" class="text-decoration-none">
                            <img src="{{ mix('img/social/twitter.svg', 'assets/build') }}" class="list-social-icon"
                                 alt="BufferMint on X">
                        </a>
                    </li>
                </ul>

            </div>
            <div class="col site-links d-flex justify-content-end">
                <div class="row">

                    @foreach ($page->footer_menu as $name => $url)
                    <div class="col-6 col-md">
                        <a href="{{ $url }}">
                            <h4 class="text-gray-600 ml-md-auto my-1 my-md-auto text-md-right">
                                {{ $name }}
                            </h4>
                        </a>
                    </div>
                    @endforeach

                    <div class="col-12 text-md-right mt-5">
                      <span class="text-gray-600 ml-md-auto my-1 my-md-auto">
                        © {{ date('Y') }} {{ $page->brand->name }}
                      </span>
                    </div>
                </div>
            </div>

        </div> <!-- / .row -->
    </div> <!-- / .container -->
</footer>