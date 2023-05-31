import axios from "axios";
import { backend_url, backend_auth_token, backend_auth_login, backend_auth_logout, writeResponse, tokenHeader } from '../../backend.js';
import { getTokentCookies, setTokenCookies, removeTokenCookies } from '../../function/cookies';


export const setAuth = payload => {
    return {
        type: 'SET_AUTH',
        payload
    }
}

export const setLoaded = payload => {
    return {
        type: 'SET_LOADED',
        payload
    }
}

export const setToken = token => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

export const setAuthData = data => {
    return {
        type: 'SET_AUTH_DATA',
        payload: data
    }
}

export const setAuthClear = data => {
    return {
        type: 'SET_AUTH_CLEAR'
    }
}


export const fetchAuthOfCookies = () => (dispatch) => {
    const authCookies = getTokentCookies();
    if (!authCookies) return;
    console.log(21312);
    dispatch(setLoaded(false));
    axios.get(backend_auth_token, tokenHeader(authCookies[1], authCookies[0]))
        .then(resp => {
            dispatch(setAuthData({ login: resp.data.data.login, userId: authCookies[0] }));
            dispatch(setToken(authCookies[1]));
            dispatch(setAuth(true));
            dispatch(setLoaded(true));
            return;
        }).catch(e => {
            if (e.response.status == 401) {
                alert(e.response.data.error);
                dispatch(setLoaded(true));
                removeTokenCookies();
            }
            return;
        });
}


export const fetchAuthLogin = (login, pass) => (dispatch) => {
    dispatch(setLoaded(false));

    axios.post(backend_auth_login, { login, pass })
        .then(resp => {
            dispatch(setAuthData({ ...resp.data.data }));
            setTokenCookies(resp.data.data.token, resp.data.data.userId);
            dispatch(setAuth(true));
            dispatch(setLoaded(true));

            return;
        }).catch(e => {
            if (e.response.status == 401) {
                alert(e.response.data.error);
                dispatch(setLoaded(true));
            }
            return;
        });
}

// export const fetchLogout = () => (dispatch) => {
//     const authCookies = getTokentCookies();
//     axios.get(backend_auth_logout, tokenHeader(authCookies[1], authCookies[0]));
//     removeTokenCookies();
//     window.location.reload();
// }

export const fetchLogout = () => {
    const authCookies = getTokentCookies();
    axios.get(backend_auth_logout, tokenHeader(authCookies[1], authCookies[0]));
    removeTokenCookies();
    window.location.reload();
}