const initialState = {
    auth: false,
    login: '',
    userId:'',
    pass: '',
    token: '',
    loaded: true
}


const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH': {
            return {
                ...state, auth: action.payload
            }
        }

        case 'SET_AUTH_CLEAR': {
            return {
                ...initialState
            }
        }

        case 'SET_LOADED': {
            return {
                ...state, loaded: action.payload
            }
        }
        case 'SET_TOKEN': {
            return {
                ...state, token: action.payload
            }
        }
        case 'SET_AUTH_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'SET_SUBCATEGORY_VISIBLE':
            return {
                ...state, subcategory: 0, subcategoryVisible: action.payload
            }
        default:
            return state;
    }

}

export default auth;