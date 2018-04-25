'use strict';
(function () {
  var imgLinks = document.querySelectorAll('.picture__link');
  var imgUpload = document.querySelector('.img-upload__input');
  var imgOverlay = document.querySelector('.img-upload__overlay');
  var imgEffect = document.querySelectorAll('.effects .effects__radio');
  var closeOverlayImg = imgOverlay.querySelector('.img-upload__cancel');
  var scaleValue = document.querySelector('.scale__value');
  var scaleLevel = document.querySelector('.scale__level');
  var btnScale = document.querySelector('.scale__pin');
  var fieldScale = document.querySelector('.img-upload__scale');
  var closeImg = window.pictures.bigPicture.querySelector('.big-picture__cancel');
  var currentEffect = '';
  var RADIUS_PIN = 9;
  var WIDTH_SCALE = 453;

  closeImg.addEventListener('click', function () {
    closePopup();
  });
  function closePopup() {
    window.pictures.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', window.utils.escCloseBigImg);
  }
  imgLinks.forEach(function (item) {
    item.addEventListener('click', onPopupClose);
  });
  function onPopupClose() {
    document.addEventListener('keydown', window.utils.escCloseBigImg);
    window.pictures.bigPicture.classList.remove('hidden');
  }
  closeOverlayImg.addEventListener('click', function () {
    imgOverlay.classList.add('hidden');
  });

  imgUpload.addEventListener('change', function () {
    imgOverlay.classList.remove('hidden');
    document.addEventListener('keydown', window.utils.escCloseImg);
    changeEffect();
  });
  function changeEffect() {
    var imgPreview = imgOverlay.querySelector('.img-upload__preview');
    imgEffect.forEach(function (item) {
      item.addEventListener('click', function () {
        imgPreview.style = '';
        scaleValue.value = '100';
        scaleLevel.style.width = '100%';
        btnScale.style.left = WIDTH_SCALE - RADIUS_PIN + 'px';
        var inputValue = item.value;
        if (currentEffect !== '') {
          imgPreview.classList.remove(currentEffect);
        }
        currentEffect = 'effects__preview--' + inputValue;
        imgPreview.classList.add(currentEffect);
        if (currentEffect === 'effects__preview--none') {
          fieldScale.classList.add('hidden');
        } else {
          fieldScale.classList.remove('hidden');
        }
      });
    });
  }
  var scale = document.querySelector('.scale');
  var imgPreview = document.querySelector('.img-upload__preview');

  btnScale.addEventListener('mousedown', onMouseDown);
  function onMouseDown(evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    function onMouseMove(moveEvt) {
      var shift = startCoordsX - moveEvt.clientX;

      startCoordsX = moveEvt.clientX;
      var cordsX = btnScale.offsetLeft - shift;
      if (cordsX - RADIUS_PIN < 0) {
        cordsX = 0;
      } else if (cordsX + RADIUS_PIN > WIDTH_SCALE) {
        cordsX = WIDTH_SCALE - RADIUS_PIN;
      }
      btnScale.style.left = cordsX + 'px';
      var percentWidth = cordsX / (WIDTH_SCALE - RADIUS_PIN) * 100;
      var scalePhobos = cordsX / (WIDTH_SCALE - RADIUS_PIN) * 5;
      var scaleHeat = cordsX / (WIDTH_SCALE - RADIUS_PIN) * 3;
      scaleLevel.style.width = percentWidth + '%';
      if (imgPreview.classList.contains('effects__preview--sepia')) {
        imgPreview.style.filter = 'sepia(' + percentWidth / 100 + ')';
      } else if (imgPreview.classList.contains('effects__preview--chrome')) {
        imgPreview.style.filter = 'grayscale(' + percentWidth / 100 + ')';
      } else if (imgPreview.classList.contains('effects__preview--marvin')) {
        imgPreview.style.filter = 'invert(' + percentWidth + '%)';
      } else if (imgPreview.classList.contains('effects__preview--phobos')) {
        imgPreview.style.filter = 'blur(' + scalePhobos + 'px)';
      } else if (imgPreview.classList.contains('effects__preview--heat')) {
        if (scaleHeat < 1) {
          scaleHeat = 1;
        }
        imgPreview.style.filter = 'brightness(' + scaleHeat + ')';
      }
    }
    function onMouseUp() {
      scale.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    scale.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  window.filter = {
    closePopup: closePopup,
    imgOverlay: imgOverlay
  };
})();
