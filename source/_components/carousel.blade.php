<section class="pt-6 pt-md-8">
      <div class="container">


            <!-- Slider -->
            <div data-flickity='{"wrapAround": true, "pageDots": false, "imagesLoaded": true, "adaptiveHeight": true}'>
              @foreach ($images as $index => $img)
              <div class="w-100">
                <img src="{{ $img }}" alt="{{ $alt[$index] ?? "Post image" }}" class="img-fluid rounded w-100">
              </div>
              @endforeach
            </div>

          </div>
</section>