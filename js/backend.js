'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/kekstagram';
  var SERVER_TIMEOUT = 5000;
  var Status = {
    ok: 200,
    request: 400,
    user: 401,
    notFound: 404
  };

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = SERVER_TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Status.ok:
          onLoad(xhr.response);
          break;
        case Status.request:
          error = 'Неверный запрос';
          break;
        case Status.user:
          error = 'Пользователь не авторизован';
          break;
        case Status.notFound:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();

  }
  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = SERVER_TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === Status.ok) {
        onLoad('Данные успешно отправлены');
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }
  window.backend = {
    save: save,
    load: load
  };
})();
