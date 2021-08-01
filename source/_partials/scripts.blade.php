@stack('scripts')
<!-- Libs JS -->

{{-- newsletter --}}
<script charset="utf-8" type="text/javascript" src="//js-eu1.hsforms.net/forms/shell.js"></script>
<script>
    hbspt.forms.create({
    region: "eu1",
    portalId: "24917138",
    formId: "27b9a8e8-95e1-42ec-ae6b-c6430abba972",
});
</script>

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