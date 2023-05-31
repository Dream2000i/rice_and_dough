const initialState = {
    category: 'pizza',
    subcategory: 0,
    subcategoryVisible: [],
    sortBy: 0
}


const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                ...state, category: action.payload
            }
        case 'SET_SORT_BY':
            return {
                ...state, sortBy: action.payload
            }
        case 'SET_SUBCATEGORY':
            return {
                ...state, subcategory: action.payload
            }
        case 'SET_SUBCATEGORY_VISIBLE':
            return {
                ...state, subcategory: 0,subcategoryVisible: action.payload
            }
        default:
            return state;
    }

}

export default filters;