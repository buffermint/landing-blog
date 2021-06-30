const mix = require('laravel-mix');
require('laravel-mix-jigsaw');

mix.disableSuccessNotifications();

mix.jigsaw()

mix.setPublicPath('source/assets/build');

mix.copyDirectory('source/_assets/img', 'source/assets/build/img');

mix.copyDirectory('source/_assets/js', 'source/assets/build/theme-js');

mix.copy("node_modules/jquery/dist/jquery.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/aos/dist/aos.js", 'source/assets/build/modules-js')
mix.copy("node_modules/choices.js/public/assets/scripts/choices.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/countup.js/dist/countUp.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/dropzone/dist/min/dropzone.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/flickity/dist/flickity.pkgd.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/flickity-fade/flickity-fade.js", 'source/assets/build/modules-js')
mix.copy("node_modules/highlightjs/highlight.pack.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/imagesloaded/imagesloaded.pkgd.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/isotope-layout/dist/isotope.pkgd.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/jarallax/dist/jarallax.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/jarallax/dist/jarallax-video.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/jarallax/dist/jarallax-element.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/quill/dist/quill.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/smooth-scroll/dist/smooth-scroll.min.js", 'source/assets/build/modules-js')
mix.copy("node_modules/typed.js/lib/typed.min.js", 'source/assets/build/modules-js')

mix.copy("node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css" , 'source/assets/build/module-css')
mix.copy("node_modules/aos/dist/aos.css" , 'source/assets/build/module-css')
mix.copy("node_modules/choices.js/public/assets/styles/choices.min.css" , 'source/assets/build/module-css')
mix.copy("node_modules/flickity-fade/flickity-fade.css" , 'source/assets/build/module-css')
mix.copy("node_modules/flickity/dist/flickity.min.css" , 'source/assets/build/module-css')
mix.copy("node_modules/highlightjs/styles/vs2015.css" , 'source/assets/build/module-css')
mix.copy("node_modules/jarallax/dist/jarallax.css" , 'source/assets/build/module-css')
mix.copy("node_modules/quill/dist/quill.core.css" , 'source/assets/build/module-css')

mix.sass('source/_assets/scss/theme.scss', 'css/theme')
mix.options({
        processCssUrls: false,
    })
mix.version()
