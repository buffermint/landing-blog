const mix = require("laravel-mix");
require("laravel-mix-jigsaw");

mix.disableSuccessNotifications();
mix
  .setPublicPath("source/assets/build")
  .copy("source/_assets/img/favicons/*", "source/assets/build/img/favicons")
  .copy("source/_assets/img/photos/*", "source/assets/build/img/photos")
  .copy("source/_assets/img/logos/*", "source/assets/build/img/logos")
  .copy("source/_assets/img/masks/*", "source/assets/build/img/masks")
  .copy("source/_assets/img/social/*", "source/assets/build/img/social")
  .copy("source/_assets/img/shapes/**/*", "source/assets/build/img/shapes")
  .copy("source/_assets/img/blog/**/*", "source/assets/build/img/blog")

  .copy("source/_assets/fonts/HK Grotesk Pro/*", "source/assets/build/css/fonts/HKGroteskPro")
  .copy("source/_assets/fonts/Feather/fonts/", "source/assets/build/fonts/feather/fonts")
  .copy("source/_assets/fonts/Feather/*", "source/assets/build/fonts/feather")
  .combine('source/_assets/js/theme/*', 'source/assets/build/js/theme.js')
  .combine(
    [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
      "node_modules/aos/dist/aos.js",
      "node_modules/choices.js/public/assets/scripts/choices.min.js",
      "node_modules/countup.js/dist/countUp.min.js",
      "node_modules/dropzone/dist/min/dropzone.min.js",
      "node_modules/flickity/dist/flickity.pkgd.min.js",
      "node_modules/flickity-fade/flickity-fade.js",
      "node_modules/highlightjs/highlight.pack.min.js",
      "node_modules/imagesloaded/imagesloaded.pkgd.min.js",
      "node_modules/isotope-layout/dist/isotope.pkgd.min.js",
      "node_modules/jarallax/dist/jarallax.min.js",
      "node_modules/jarallax/dist/jarallax-video.min.js",
      "node_modules/jarallax/dist/jarallax-element.min.js",
      "node_modules/quill/dist/quill.min.js",
      "node_modules/smooth-scroll/dist/smooth-scroll.min.js",
      "node_modules/typed.js/lib/typed.min.js",
    ],
    "source/assets/build/js/vendor.js"
  )
  .combine(
    [
      "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css",
      "node_modules/aos/dist/aos.css",
      "node_modules/choices.js/public/assets/styles/choices.min.css",
      "node_modules/flickity-fade/flickity-fade.css",
      "node_modules/flickity/dist/flickity.min.css",
      "node_modules/highlightjs/styles/vs2015.css",
      "node_modules/jarallax/dist/jarallax.css",
      "node_modules/quill/dist/quill.core.css",
      "node_modules/quill/dist/quill.core.css",
      "node_modules/quill/dist/quill.core.css",
      "node_modules/quill/dist/quill.core.css",
    ],
    "source/assets/build/css/vendor.css"
  )
  .js('source/_assets/js/main.js', 'js/main.js').vue()
  .js('source/_assets/js/posts.js', 'js/posts.js').vue()
  .sass("source/_assets/scss/theme.scss", "css/theme.css")
  .sass("source/_assets/scss/posts.scss", "css/posts.css")
  .jigsaw({
        watch: ['config.php', 'source/**/*.md', 'source/**/*.php', 'source/**/*.scss'],
    })
  .options({ processCssUrls: false })
  .version();
