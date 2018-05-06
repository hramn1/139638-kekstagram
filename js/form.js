'use strict';
(function () {
  var MAX_HASHTAGS_LENGTH = 20;
  var MIN_HASHTAGS_LENGTH = 2;
  var MAX_ELEVENT = 5;
  var ESC_KEYCODE = 27;
  var hashtag = document.querySelector('.text__hashtags');
  var commentText = document.querySelector('.text__description');
  var formImg = document.querySelector('.img-upload__form');

  hashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.utils.escCloseImg);
  });
  hashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', window.utils.escCloseImg);
  });
  commentText.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.utils.escCloseImg);
  });
  commentText.addEventListener('blur', function () {
    document.addEventListener('keydown', window.utils.escCloseImg);
  });

  commentText.addEventListener('invalid', function () {
    commentText.setCustomValidity('Не больше 140 символов');
  });

  hashtag.addEventListener('change', function () {
    var hashtagValue = hashtag.value;
    var hashtagArray = hashtagValue.split(' ');
    if (hashtagArray.length > MAX_ELEVENT) {
      hashtag.setCustomValidity('Должно быть не больше 5');
      hashtag.style.border = '1px solid red';
    } else if (hashtagValue === '') {
      hashtag.setCustomValidity('');
      hashtag.style = '';
    } else {
      for (var i = 0; i < hashtagArray.length; i++) {
        hashtagArray[i] = hashtagArray[i].toLowerCase();
        if (hashtagArray[i].length > MAX_HASHTAGS_LENGTH) {
          hashtag.setCustomValidity('Хэш-тег не должен быть больше 20 символов');
          hashtag.style.border = '1px solid red';
          break;
        } else if (hashtagArray[i].length < MIN_HASHTAGS_LENGTH) {
          hashtag.setCustomValidity('Хэш-тег не должен состоять из одной #');
          hashtag.style.border = '1px solid red';
          break;
        } else if (hashtagArray[i].charAt(0) !== '#') {
          hashtag.setCustomValidity('Хэш-тег должен начинаться с #');
          hashtag.style.border = '1px solid red';
          break;
        } else if (hashtagArray[i].indexOf('#', 1) + 1) {
          hashtag.setCustomValidity('Хэш-тег должен иметь только одну #');
          hashtag.style.border = '1px solid red';
          break;
        } else if (hashtagArray[i] === hashtagArray[i - 1] || hashtagArray[i] === hashtagArray[i - 2] || hashtagArray[i] === hashtagArray[i - 3] || hashtagArray[i] === hashtagArray[i - 4]) {
          hashtag.setCustomValidity('Хэш-тег не должен повторятся');
          hashtag.style.border = '1px solid red';
          break;
        } else {
          hashtag.setCustomValidity('');
          hashtag.style = '';
        }
      }
    }
  });
  function onSuccessRequest(successMessage) {
    var node = document.createElement('div');
    node.textContent = successMessage;
    node.classList.add('success-message');
    document.body.insertAdjacentElement('afterbegin', node);
    formImg.reset();
    window.filter.closingImgOverlay();
    function onSuccessEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        var successMessageEsc = node;
        successMessageEsc.remove();
        document.removeEventListener('keydown', onSuccessEscPress);
      }
    }
    window.addEventListener('keydown', onSuccessEscPress);
  }
  function onErrorRequest(errorMessage) {
    var message = document.createElement('div');
    message.classList.add('error-message');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
    function onErrorEscPress(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        var errorMessageEsc = message;
        errorMessageEsc.remove();
        document.removeEventListener('keydown', onErrorEscPress);
      }
    }
    window.addEventListener('keydown', onErrorEscPress);
  }
  function formSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formImg), onSuccessRequest, onErrorRequest);
  }
  formImg.addEventListener('submit', formSubmit);
  window.form = {
    onErrorRequest: onErrorRequest
  };
})();
