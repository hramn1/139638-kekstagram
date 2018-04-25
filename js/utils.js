'use strict';
(function () {
  var ESC_KEYCODE = 27;
  window.utils = {
    escCloseBigImg: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.filter.closePopup();
      }
    },
    escCloseImg: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.filter.imgOverlay.classList.add('hidden');
      }
    }
  };
})();
