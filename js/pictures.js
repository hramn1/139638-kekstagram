'use strict';
(function () {
  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.querySelector('body');
  var imgFilters = document.querySelector('.img-filters');
  var btnPopular = document.querySelector('#filter-popular');
  var btnNew = document.querySelector('#filter-new');
  var btnDiscussed = document.querySelector('#filter-discussed');
  var photoes = [];

  window.backend.load(dataLoadAds, window.form.onErrorRequest);
  function dataLoadAds(data) {
    photoes = data;
    showImg(photoes);
    function filterdPop() {
      photoes.sort(function (first, second) {
        return second.likes - first.likes;
      });
      showImg(photoes);
      btnPopular.classList.add('img-filters__button--active');
    }
    function filterOrigin() {
      showImg(photoes);
      btnNew.classList.add('img-filters__button--active');
    }
    function filterComment() {
      photoes.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
      showImg(photoes);
      btnDiscussed.classList.add('img-filters__button--active');
    }

    var imgLinks = document.querySelectorAll('.picture__link');
    imgLinks.forEach(function (item) {
      item.addEventListener('click', onPopupClose);
    });
    function onPopupClose(evt) {
      var currentImg = evt.currentTarget.getAttribute('data-index');
      body.classList.add('modal-open');
      document.addEventListener('keydown', window.utils.escCloseBigImg);
      window.pictures.bigPicture.classList.remove('hidden');
      showBigPicture(photoes, currentImg);
    }
    imgFilters.classList.remove('img-filters--inactive');
    btnPopular.addEventListener('click', filterdPop);
    btnNew.addEventListener('click', filterOrigin);
    btnDiscussed.addEventListener('click', filterComment);
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
  }
  function showBigPicture(ad, indexImg) {
    var photos = ad[indexImg];
    var maxComment = photos.comments.length - 1;
    document.addEventListener('keydown', window.utils.escCloseBigImg);
    var imgBig = bigPicture.querySelector('.social__picture');
    imgBig.src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    bigPicture.querySelector('.big-picture__img img').src = photos.url;
    bigPicture.querySelector('.likes-count').textContent = photos.likes;
    bigPicture.querySelector('.comments-count').textContent = photos.comments.length;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
    bigPicture.querySelector('.social__caption').innerHTML = photos.comments[0];
    bigPicture.querySelector('.social__comments').innerHTML = '<li class="social__comment social__comment--text">' +
      imgBig.outerHTML + photos.comments[generateRandomNumber(0, maxComment)] + '</li>' + '<li class="social__comment social__comment--text">' +
      imgBig.outerHTML + photos.comments[generateRandomNumber(0, maxComment)] + '</li>';
  }

  window.pictures = {
    bigPicture: bigPicture,
    body: body
  };
})();
