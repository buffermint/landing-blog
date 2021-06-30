var defaultOptions = {
  typeSpeed: 40,
  backSpeed: 30,
  backDelay: 1000,
}

var firstTypedOptions = {
  stringsElement: "#first-typed-text",
  loop: false,
  onComplete: function (self) {

    setTimeout(function() {
      $(".hero-section .first-typed-container .typed-cursor").css({'visibility': 'hidden'});

      setTimeout(function() {
        $(".hero-section .first-typed-container").animate({top: '-100px'}, 100);
      }, 500)

      setTimeout(function() {
        new Typed("#second-typed", Object.assign(defaultOptions, secondTypedOptions));
      }, 2500)
    }, 500)
  },
};

new Typed("#first-typed", Object.assign(defaultOptions, firstTypedOptions));

var secondTypedOptions = {
  loop: false,
  stringsElement: "#second-typed-text",
  onComplete: function () {

    setTimeout(function() {
      // $(".hero-section .second-typed-container .typed-cursor").hide();
      $(".hero-section .second-typed-container .typed-cursor").css({'visibility': 'hidden'});

      setTimeout(function() {
        $(".hero-section .first-typed-container").animate({top: '-200px'}, 100);
        $(".hero-section .second-typed-container").animate({top: '-100px'}, 100);
      }, 500)


      setTimeout(function() {
        new Typed("#third-typed", Object.assign(defaultOptions, thirdTypedOptions));
      }, 2500)
    }, 500)
  },
};


var thirdTypedOptions = {
  stringsElement: "#third-typed-text",
  backDelay: 2000,
  loop: true,
  onComplete: function(){}
};