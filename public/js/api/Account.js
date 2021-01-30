'use strict';
/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
    /**
     * Получает информацию о счёте
     * */
    static get(id = '', callback) {
        return createRequest({
            url: this.URL,
            method: 'GET',
            responseType: 'json',
            data: data,
            callback: callback
        });
    }
}
