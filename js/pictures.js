'use strict';
(function () {
  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var ads = [];

  window.backend.load(dataLoadAds, window.form.onErrorRequest);
  function dataLoadAds(data) {
    ads = data;
    showImg(ads);
    showBigPicture(ads);
    var imgLinks = document.querySelectorAll('.picture__link');
    imgLinks.forEach(function (item) {
      item.addEventListener('click', onPopupClose);
    });
    function onPopupClose() {
      document.addEventListener('keydown', window.utils.escCloseBigImg);
      window.pictures.bigPicture.classList.remove('hidden');
    }
  }
  function generateRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function showImg(photos) {
    var fragmentImg = document.createDocumentFragment();
    photos.forEach(function (item, i) {
      var templatePhoto = template.cloneNode(true);
      templatePhoto.querySelector('.picture__link').setAttribute('data-index', i);
      templatePhoto.querySelector('.picture__img').src = photos[i].url;
      templatePhoto.querySelector('.picture__stat--likes').textContent = photos[i].likes;
      templatePhoto.querySelector('.picture__stat--comments').textContent = photos[i].comments.length;
      fragmentImg.appendChild(templatePhoto);
    });
    pictures.appendChild(fragmentImg);
    return photos;
  }
  function showBigPicture(ad) {
    var photos = ad;
    document.addEventListener('keydown', window.utils.escCloseBigImg);
    var imgBig = bigPicture.querySelector('.social__picture');
    imgBig.src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    bigPicture.querySelector('.big-picture__img img').src = photos[0].url;
    bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
    bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comments').innerHTML = '<li class="social__comment social__comment--text">' +
      imgBig.outerHTML + photos[0].comments + '</li>' + '<li class="social__comment social__comment--text">' +
      imgBig.outerHTML + photos[1].comments + '</li>';
  }
  window.pictures = {
    bigPicture: bigPicture,
  };
})();
