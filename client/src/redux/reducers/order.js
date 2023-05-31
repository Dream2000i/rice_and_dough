const initialState = {
    name: '',
    phone: '+7',
    delivery: true,
    pay: 0,
    street: '',
    house: '',
    porch: '',
    level: '',
    apartment: '',
    comment: '',
    tableware: 1,
    promoCode: ''
}


const order = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'SET_PROMO_CODE': {
            return {
                ...state,
                promoCode: action.payload
            }
        }
        case 'ORDER_DATA_CLEAR': {
            return {
                ...initialState,
            }
        }
        default:
            return state;
    }

}

export default order;