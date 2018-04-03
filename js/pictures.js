'use strict';

var generateRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var arr = [];

var likes = generateRandomNumber(15, 200);
var comment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
'Вот это тачка!'];
var generateArray = function () {
  for (var i = 1; i <= 25; i++) {
    var link = 'photos/' + i + '.jpg';
    arr.push(
      {
        url: link,
        likes: likes,
        comments: comment[generateRandomNumber(0, 5)] + ' ' + comment[generateRandomNumber(0, 5)],
        description: description[generateRandomNumber(0, 5)]
      }
    )
  }
};
generateArray();
console.log(arr);
