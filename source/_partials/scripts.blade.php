<!-- Libs JS -->
<script src="{{ mix('js/vendor.js', 'assets/build') }}"></script>

<!-- Map -->
<script src='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>
<script src="{{ mix('js/theme.js', 'assets/build') }}"></script>
<script src="{{ mix('js/main.js', 'assets/build') }}"></script>

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