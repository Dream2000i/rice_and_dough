// export const backend_url = 'http://testdream.hostronavt.ru/backend/client/';
// export const backend_url = 'http://580600.ru/backend/client/';
export const backend_url = 'http://apirice/client/';


// export const backend_url = 'http://api.host1842395.hostland.pro/client/';

// export const backend_url = 'https://api.580600.ru/client/';

export const backend_get_goods = `${backend_url}goods`;
export const backend_get_setting = `${backend_url}setting`;


export const backend_phone_validation = `${backend_url}validation`;
export const backend_add_order = `${backend_url}addOrder`;
export const check_promo_code = `${backend_url}promocode`;


export const writeResponse = (response) => {
    if (!response.result) return alert('Ошибка сервера: '+response.error);
    return true;
}
