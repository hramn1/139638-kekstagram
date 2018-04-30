'use strict';
(function () {
  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');


  // var photos = showImg();
  // showImg();
  // showBigPicture(photos[0]);
  window.backend.load(showImg, window.form.onErrorRequest);

  function generateRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function showImg(data) {
    var photos = data;
    var fragmentImg = document.createDocumentFragment();
    photos.forEach(function (item, i) {
      var templatePhoto = template.cloneNode(true);
      templatePhoto.querySelector('.picture__link').setAttribute('data-index', i);
      templatePhoto.querySelector('.picture__img').src = data[i].url;
      templatePhoto.querySelector('.picture__stat--likes').textContent = data[i].likes;
      templatePhoto.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
      fragmentImg.appendChild(templatePhoto);
    });
    pictures.appendChild(fragmentImg);
    return photos;
  }
  function showBigPicture(firstPhoto) {
    document.addEventListener('keydown', window.utils.escCloseBigImg);
    var imgBig = bigPicture.querySelector('.social__picture');
    imgBig.src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    bigPicture.querySelector('.big-picture__img img').src = firstPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = firstPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = firstPhoto.comments.length;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comments').innerHTML = '<li class="social__comment social__comment--text">' +
      imgBig.outerHTML + photos[0].comments + '</li>' + '<li class="social__comment social__comment--text">' +
      imgBig.outerHTML + photos[1].comments + '</li>';
  }
  window.pictures = {
    bigPicture: bigPicture
  };
})();
