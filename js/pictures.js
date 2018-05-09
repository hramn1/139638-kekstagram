'use strict';
(function () {

  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var body = document.body;
  var imgFilters = document.querySelector('.img-filters');
  var btnPopular = document.querySelector('#filter-popular');
  var btnNew = document.querySelector('#filter-new');
  var btnDiscussed = document.querySelector('#filter-discussed');
  var btnForm = document.querySelector('.img-filters__form');
  var btnSelect = btnForm.querySelectorAll('button');
  var loadMore = bigPicture.querySelector('.social__comment-loadmore');
  var photoes = [];

  function removePicture() {
    var pictureLink = document.querySelectorAll('.picture__link');
    pictureLink.forEach(function (item) {
      pictures.removeChild(item);
    });
  }
  function removeBtnClass() {
    btnSelect.forEach(function (item) {
      if (item.classList.contains('img-filters__button--active')) {
        item.classList.remove('img-filters__button--active');
      }
    });
  }
  function showBigImg() {
    var imgLinks = document.querySelectorAll('.picture__link');
    imgLinks.forEach(function (item) {
      item.addEventListener('click', onPopupOpen);
    });
  }
  function onPopupOpen(evt) {
    var currentImg = evt.currentTarget.getAttribute('data-index');
    body.classList.add('modal-open');
    document.addEventListener('keydown', window.utils.escCloseBigImg);
    window.pictures.bigPicture.classList.remove('hidden');
    showBigPicture(photoes, currentImg);
  }
  window.backend.load(dataLoadAds, window.form.onErrorRequest);
  function dataLoadAds(data) {
    photoes = data;
    showImg(photoes);
    showBigImg();
    function filterdPop() {
      removePicture();
      removeBtnClass();
      var popPhotoes = photoes.slice();
      popPhotoes.sort(function (first, second) {
        return second.likes - first.likes;
      });
      showImg(popPhotoes);
      photoes = popPhotoes;
      showBigImg();
      btnPopular.classList.add('img-filters__button--active');
    }
    function filterOrigin() {
      photoes = data;
      removePicture();
      removeBtnClass();
      showImg(photoes);
      showBigImg();
      btnNew.classList.add('img-filters__button--active');
    }
    function filterComment() {
      removePicture();
      removeBtnClass();
      var photoComment = photoes.slice();
      photoComment.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
      showImg(photoComment);
      photoes = photoComment;
      showBigImg();
      btnDiscussed.classList.add('img-filters__button--active');
    }

    imgFilters.classList.remove('img-filters--inactive');
    function btnDebounce() {
      btnPopular.addEventListener('click', filterdPop);
      btnNew.addEventListener('click', filterOrigin);
      btnDiscussed.addEventListener('click', filterComment);
    }
    window.debounce(btnDebounce);
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
    var countComment = 5;
    var photos = ad[indexImg];
    var maxComment = photos.comments.length;
    var imgBig = bigPicture.querySelector('.social__picture');
    var textCount = bigPicture.querySelector('.social__comment-count');
    loadMore.style.cursor = 'pointer';
    document.addEventListener('keydown', window.utils.escCloseBigImg);
    bigPicture.querySelector('.big-picture__img img').src = photos.url;
    bigPicture.querySelector('.likes-count').textContent = photos.likes;
    function showCountComment() {
      if (countComment > maxComment) {
        textCount.innerHTML = maxComment + ' из <span class="comments-count">' + maxComment + '</span> комментариев';
      } else {
        textCount.innerHTML = countComment + ' из <span class="comments-count">' + maxComment + '</span> комментариев';
      }
    }
    bigPicture.querySelector('.social__caption').innerHTML = photos.comments[0];
    bigPicture.querySelector('.social__comments').innerHTML = '';
    loadMore.addEventListener('click', function () {
      countComment += 5;
      bigPicture.querySelector('.social__comments').innerHTML = '';
      commentLoad();
    });
    commentLoad();
    function commentLoad() {
      showCountComment();
      var commentFive = photos.comments.filter(function (number, i) {
        return i < countComment;
      });
      commentFive.forEach(function (item) {
        imgBig.src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
        var newFeatures = document.createElement('li');
        newFeatures.className = 'social__comment social__comment--text';
        newFeatures.innerHTML = imgBig.outerHTML + item;
        bigPicture.querySelector('.social__comments').appendChild(newFeatures);
      });
    }
  }
  window.pictures = {
    bigPicture: bigPicture,
    body: body
  };
})();
