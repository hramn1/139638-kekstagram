'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var prevTimer;

  window.debounce = function (func) {
    if (prevTimer) {
      window.clearTimeout(prevTimer);
    }
    prevTimer = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };
})();
