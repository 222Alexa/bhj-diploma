'use strict';
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
        localStorage.user = JSON.stringify(user);
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem('user');
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        try {
            return JSON.parse(localStorage.user);
        } catch (err) {
            return null;
        }
    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(callback) {
        return createRequest({
            url: User.URL + '/current',
            data: {},
            responseType: 'json',
            method: 'GET',
            callback: (err, response) => {
                if (response && response.user) {
                    User.setCurrent(response.user);
                } else {
                    this.unsetCurrent();
                }
                callback(err, response);
            }
        });

    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback) {
        return createRequest({
            url: this.URL + '/login',
            method: 'POST',
            responseType: 'json',
            data: {},
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback) {
        return createRequest({
            url: User.URL + '/register',
            data: {},
            responseType: 'json',
            method: 'POST',
            callback: (err, response) => {
                if (response.success === true) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });

    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(data, callback) {
        return createRequest({
            url: User.URL + '/logout',
            data,
            responseType: 'json',
            method: 'POST',
            callback: (err, response) => {
                if (response.success === true) {
                    this.unsetCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }
    static URL = '/user';
}
