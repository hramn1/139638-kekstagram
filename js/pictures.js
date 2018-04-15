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
// module-task4

var imgLinks = document.querySelectorAll('.picture__link');
var imgUpload = document.querySelector('.img-upload__input');
var imgOverlay = document.querySelector('.img-upload__overlay');
var imgEffect = document.querySelectorAll('.effects .effects__radio');
var closeOverlayImg = imgOverlay.querySelector('.img-upload__cancel');
var currentEffect = '';
var ESC_KEYCODE = 27;

imgLinks.forEach(function (item, i) {
  imgLinks[i].addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
  });
  var closeImg = bigPicture.querySelector('.big-picture__cancel');
  closeImg.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', EscCloseBigImg);
  function EscCloseBigImg(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      bigPicture.classList.add('hidden');
    }
  }
});
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
  imgEffect.forEach(function (item, i) {
    imgEffect[i].addEventListener('click', function () {
      var inputValue = imgEffect[i].value;
      if (currentEffect !== '') {
        imgPreview.classList.remove(currentEffect);
      }
      currentEffect = 'effects__preview--' + inputValue;
      imgPreview.classList.add(currentEffect);
    });
  });
}
