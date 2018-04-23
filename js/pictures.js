'use strict';
var template = document.querySelector('#picture').content;
var pictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var comment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
  'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var photos = generatePhoto();

showImg(photos);
showBigPicture(photos[0]);

function generateRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function generatePhoto() {
  photos = [];
  for (var i = 1; i <= 25; i++) {
    var link = 'photos/' + i + '.jpg';
    photos.push(
        {
          url: link,
          likes: generateRandomNumber(15, 200),
          comments: comment[generateRandomNumber(0, 5)] + ' ' + comment[generateRandomNumber(0, 5)],
          description: description[generateRandomNumber(0, 5)]
        }
    );
  }
  return photos;
}

function showImg() {
  var fragmentImg = document.createDocumentFragment();
  photos.forEach(function (item, i) {
    var templatePhoto = template.cloneNode(true);
    templatePhoto.querySelector('.picture__img').src = photos[i].url;
    templatePhoto.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    templatePhoto.querySelector('.picture__stat--comments').textContent = photos[i].comments.length;
    fragmentImg.appendChild(templatePhoto);
  });
  pictures.appendChild(fragmentImg);
}
function showBigPicture(firstPhoto) {
  document.addEventListener('keydown', escCloseBigImg);
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

var hashtag = document.querySelector('.text__hashtags');
var commentText = document.querySelector('.text__description');
var MAX_HASHTAGS_LENGTH = 20;
var MIN_HASHTAGS_LENGTH = 2;
var MAX_ELEVENT = 5;

hashtag.addEventListener('focus', function () {
  document.removeEventListener('keydown', escCloseImg);
});
hashtag.addEventListener('blur', function () {
  document.addEventListener('keydown', escCloseImg);
});
commentText.addEventListener('focus', function () {
  document.removeEventListener('keydown', escCloseImg);
});
commentText.addEventListener('blur', function () {
  document.addEventListener('keydown', escCloseImg);
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
    for (var i = 0; i < hashtagValue.length; i++) {
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
// filter js
var imgLinks = document.querySelectorAll('.picture__link');
var imgUpload = document.querySelector('.img-upload__input');
var imgOverlay = document.querySelector('.img-upload__overlay');
var imgEffect = document.querySelectorAll('.effects .effects__radio');
var closeOverlayImg = imgOverlay.querySelector('.img-upload__cancel');
var scaleValue = document.querySelector('.scale__value');
var scaleLevel = document.querySelector('.scale__level');
var btnScale = document.querySelector('.scale__pin');
var fieldScale = document.querySelector('.img-upload__scale');
var closeImg = bigPicture.querySelector('.big-picture__cancel');
var currentEffect = '';
var ESC_KEYCODE = 27;
var RADIUS_PIN = 9;
var WIDTH_SCALE = 453;


function escCloseBigImg(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}
closeImg.addEventListener('click', function () {
  closePopup();
});
function closePopup() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', escCloseBigImg);
}
imgLinks.forEach(function (item) {
  item.addEventListener('click', onPopupClose);
});
function onPopupClose() {
  document.addEventListener('keydown', escCloseBigImg);
  bigPicture.classList.remove('hidden');
}
closeOverlayImg.addEventListener('click', function () {
  imgOverlay.classList.add('hidden');
});

function escCloseImg(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgOverlay.classList.add('hidden');
  }
}
imgUpload.addEventListener('change', function () {
  imgOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escCloseImg);
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
