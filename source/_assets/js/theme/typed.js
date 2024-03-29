//
// typed.js
// Theme module
//

'use strict';

window.onload = function() {

  //
  // Variables
  //

  var toggle = document.querySelectorAll('[data-toggle="typed"]');

  //
  // Functions
  //

  function init(el) {
    var elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};
    var defaultOptions = {
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 3000,
      startDelay: 250,
      loop: true,
      onBegin: function(arrayPos, self){
        $('#typed-hide-on-start').hide();
      },
    }
    var options = Object.assign(defaultOptions, elementOptions);

    // Init
    new Typed(el, options);
  }

  //
  // Events
  //

  if (typeof Typed !== 'undefined' && toggle) {
    [].forEach.call(toggle, function(el) {
      init(el);
    });
  }

};
