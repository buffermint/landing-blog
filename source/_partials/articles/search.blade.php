{{-- Blog search box (BM-48: was Search.vue). source/_assets/js/blog-search.js adds the counter and the result list. --}}
<section class="py-6" data-blog-search>
    <div class="container search-container">
        <div class="row">
            <div class="col-12">
                <!-- Form -->
                <div class="input-group input-group-lg">
                    <!-- Prepend -->
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 pr-1">
                            <i class="fe fe-search"></i>
                        </span>
                    </div>

                    <!-- Input -->
                    <input id="search" type="text" class="form-control border-0 px-1"
                        aria-label="Search our blog..." placeholder="Search our blog...">
                </div>
            </div>
        </div>

        <div class="row" data-blog-search-results></div>
    </div>
</section>
