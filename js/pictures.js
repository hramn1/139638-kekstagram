'use strict';
(function () {
  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  // var comment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  // ];
  // var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
  //   'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  //   'Вот это тачка!'];


  // var photos = showImg();
  // showImg();
  // showBigPicture(photos[0]);
  window.backend.load(showImg, window.form.onErrorRequest);

  function generateRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  // function generatePhoto() {
  //   photos = [];
  //   for (var i = 1; i <= 25; i++) {
  //     var link = 'photos/' + i + '.jpg';
  //     photos.push(
  //         {
  //           url: link,
  //           likes: generateRandomNumber(15, 200),
  //           comments: comment[generateRandomNumber(0, 5)] + ' ' + comment[generateRandomNumber(0, 5)],
  //           description: description[generateRandomNumber(0, 5)]
  //         }
  //     );
  //   }
  //   return photos;
  // }
  function showImg(data) {

    var photos = data;
    var fragmentImg = document.createDocumentFragment();
    photos.forEach(function (item, i) {
      var templatePhoto = template.cloneNode(true);
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
