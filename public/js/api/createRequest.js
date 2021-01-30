'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const f = function () {},
        {
            method = 'GET',
            callback = f,
            responseType,
            async = true,
            data = {}
        } = options,
        xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.withCredentials = true;
    xhr.responseType = options.responseType || 'json';
    

    if (options.method === 'GET') {
        options.url += `?`;
        for (let key in options.data) {
            options.url += `${key}=${options.data[key]}&`;
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);

        }

    }
    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    } catch (err) {
        callback(err);
    }
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE & xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            options.callback(null, response);
        }
    });
}

/*const formData = new FormData();
    xhr.responseType = options.responseType;
    //У возвращаемого объекта всегда свойство withCredentials задано в true
    xhr.withCredetials = true;

    //При параметре method = GET, данные из объекта data должны передаваться в строке адреса.
    if (options.method === 'GET') {
        options.url += `?`;
        for (let key in options.data) {
            options.url += `${key} = ${options.data[key]}&`;
        }
    } //При параметре method отличном от GET, данные из объекта data должны передаваться через объект FormData.
    else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }
    

    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    } catch (err) {
        callback(err) //если в процессе выполнения функции возникают ошибки, вам необходимо передать эту ошибку в параметр err
    }
   
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE & xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            options.callback(null, response); //В случае успешного выполнения кода, необходимо вызвать функцию, заданную в callback и передать туда данные
        }

    });

    };/ это была старая версия*/
