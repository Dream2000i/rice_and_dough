// export const backend_url = 'http://testdream.hostronavt.ru/backend/client/';
// export const backend_url = 'http://580600.ru/backend/client/';

import { getTokentCookies } from "./function/cookies";



// export const backend_url = 'http://api.580600.ru/';
// export const backend_url = 'http://testapi.580600.ru/';
export const backend_url = 'http://apirice/';


export const backend_auth_token = `${backend_url}auth/token`;
export const backend_auth_login = `${backend_url}auth/login`;
export const backend_auth_logout = `${backend_url}auth/logout`;


export const backend_happy_hours_get = `admin/discount/gethappyhours`
export const backend_happy_hours_set = `admin/discount/sethappyhours`


export const backend_get_goods = `${backend_url}goods`;
export const backend_get_setting = `${backend_url}setting`;


export const backend_phone_validation = `${backend_url}validation`;
export const backend_add_order = `${backend_url}addOrder`;


export const tokenHeader = (token, id) => {
    const headers = {
        Authorization: token,
        userId: id
    }
    return { headers };
}

export const getTokens = () => {
    const [id, token] = getTokentCookies();
    
    return tokenHeader(token,id);
}

export const writeResponse = (response) => {
    if (!response.result) return alert('Ошибка сервера: ' + response.error);
    return true;
}