const initialState = {
    name: 'Гость',
    phone: '+7 (964) 661 33 81',
    delivery: true,
    pay: 0,
    street: '',
    house: '',
    porch: '',
    level: '',
    apartment: '',
    comment: ''
}


const order = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORDER_DATA': {
            return {
                ...state,
                ...action.payload
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