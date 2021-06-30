<!-- Libs JS -->
<script src="{{ mix('modules-js/jquery.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/bootstrap.bundle.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/jquery.fancybox.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/aos.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/choices.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/countUp.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/dropzone.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/flickity.pkgd.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/flickity-fade.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/highlight.pack.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/imagesloaded.pkgd.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/isotope.pkgd.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/jarallax.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/jarallax-video.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/jarallax-element.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/quill.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/smooth-scroll.min.js', 'assets/build') }}"></script>
<script src="{{ mix('modules-js/typed.min.js', 'assets/build') }}"></script>

<!-- Map -->
<script src='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>

<!-- Theme JS -->
<!-- build:js @@webRoot/assets/js/theme.min.js -->
<script src="{{ mix('theme-js/polyfills.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/aos.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/choices.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/countup.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/dropdown.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/dropzone.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/fancybox.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/highlight.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/isotope.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/map.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/modal.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/navbar.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/popovers.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/pricing.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/quill.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/smooth-scroll.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/tooltips.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/typed.js', 'assets/build') }}"></script>
<script src="{{ mix('theme-js/typed-custom.js', 'assets/build') }}"></script>
<!-- endbuild -->

<script>
    if(window.screen.width < 993){
        const navLinks = document.querySelectorAll('.nav-item')
        navLinks.forEach((l) => {
        l.addEventListener('click', function() {
            $('#navbarCollapse').collapse('toggle')
        })
    })
    }

</script>