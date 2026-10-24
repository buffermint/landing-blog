const mix = require("laravel-mix");
require("laravel-mix-jigsaw");

mix.disableSuccessNotifications();
mix
  .setPublicPath("source/assets/build")
  .copy("source/_assets/img/photos/*", "source/assets/build/img/photos")
  .copy("source/_assets/img/logos/*", "source/assets/build/img/logos")
  // legacy favicons: no page links them since the brand repo took over (/brand/logos/), but the old
  // /assets/build/img/favicons/* URLs are still requested, so keep serving them
  .copy("source/_assets/img/favicons/*", "source/assets/build/img/favicons")
  .copy("source/_assets/img/masks/*", "source/assets/build/img/masks")
  .copy("source/_assets/img/social/*", "source/assets/build/img/social")
  .copy("source/_assets/img/shapes/**/*", "source/assets/build/img/shapes")
  .copy("source/_assets/img/blog/**/*", "source/assets/build/img/blog")

  // Feather icons (fe-check in lists): WOFF is enough for every browser we support
  .copy("source/_assets/fonts/Feather/fonts/Feather.woff", "source/assets/build/fonts/feather/fonts")
  .copy("source/_assets/fonts/Feather/*", "source/assets/build/fonts/feather")
  // only the theme scripts a page still uses (svg-shim colours); the rest drove libraries no page uses
  .combine(["source/_assets/js/theme/polyfills.js"], "source/assets/build/js/theme.js")
  // PLAN 13: only what the pages use. jQuery (blog search), jarallax (post cover parallax, data-jarallax).
  // Dropped: Bootstrap JS, fancybox, AOS, choices, flickity, imagesloaded, isotope, smooth-scroll, typed
  // (no page has their data-* hooks; the header/footer come from the brand chrome).
  .combine(
    [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/jarallax/dist/jarallax.min.js",
    ],
    "source/assets/build/js/vendor.js"
  )
  .combine(["node_modules/jarallax/dist/jarallax.css"], "source/assets/build/css/vendor.css")
  .js('source/_assets/js/main.js', 'js/main.js').vue()
  .js('source/_assets/js/posts.js', 'js/posts.js')
  .sass("source/_assets/scss/theme.scss", "css/theme.css")
  .sass("source/_assets/scss/posts.scss", "css/posts.css")
  .jigsaw({
        watch: ['config.php', 'source/**/*.md', 'source/**/*.php', 'source/**/*.scss'],
    })
  .options({ processCssUrls: false })
  .version();
