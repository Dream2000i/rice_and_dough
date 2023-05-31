import axios from "axios";
import { backend_url, getTokens } from "../backend";


export const get_post = async (url, method = 'get', body) => {
    let resp;

    try {
        switch (method) {
            case 'get':
                resp = await axios.get(backend_url + url, getTokens());
                break;
            case 'post':
                resp = await axios.post(backend_url + url, body, getTokens());
                break;
            default:
                break;

        }

        // const resp = await axios[method](backend_url + url, body, getTokens());
        if (resp.data.result) {
            if (resp.data.data.warn) alert(resp.data.data.warn);
            return resp.data.data;
        } else {
            alert(resp.data.error);
            return false;
        }


    } catch (e) {
        alert(e);
        return false;
    }


}

export const get_req = async (url) => {
    return await get_post(url);
}

export const post_req = async (url, body) => {
    return await get_post(url, 'post', body);
}