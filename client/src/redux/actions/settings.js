import axios from "axios";
import { backend_get_setting, writeResponse } from '../../backend.js';


// export const fetchSettings = () => (dispatch) => {
//     axios.get(backend_get_setting, {}, {
//         headers: {
//             Authorization: '241234'
//         }
//     })
//         .then(resp => (writeResponse(resp.data)) ? dispatch(setSettings(resp.data.data)) : '');




// }
export const fetchSettings = () => (dispatch) => {
    axios.get(backend_get_setting)
        .then(resp => (writeResponse(resp.data)) ? dispatch(setSettings(resp.data.data)) : '');
}



export const setSettings = (settings) => (
    {
        type: 'SET_SETTINGS',
        payload: settings
    }
);

