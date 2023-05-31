const initialState = {
    items: {},
    isLoaded: false,
    category:'',
    sort:0
}

const goods = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GOODS':
            return {
                ...state,
                items: action.payload,
                // category:action.payload.category,
                // sort:action.payload.sort,
                isLoaded: true
            }
        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload
            }

        // case 'CLEAR_GOODS': 
        //     return {
        //         ...initialState,
        //     }
        
        default:
            return state;
    }

}

export default goods;