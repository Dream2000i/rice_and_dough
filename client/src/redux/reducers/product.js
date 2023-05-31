const initialState = {
    product: {},
    isLoaded: false,
    goodsCategory:'',
    options: {},
    count: 1,
    price: 0
}
const calcOptionsPrice = (obj) => {
    let price = 0;
    Object.values(obj).map(item => {
        item.option.map((opt, i) => {
            if (item.current.includes(i)) price += opt[1];
        })
    })
    return price;
}


const product = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return {
                ...state,
                product: action.payload.product,
                goodsCategory: action.payload.category,
                price: action.payload.product.price,
                isLoaded:true
            }
        case 'SET_OPTIONS': {
            const obj = {};
            action.payload.map((item,i) => {obj[item.name] = {...item,id:i}});

             return {
                ...state,
                options: obj,
            }

        }
        case 'SELECT_OPTIONS': {
            const obj = {
                ...state.options,
            };

            let cur;

            switch (obj[action.payload.name].select[0]) {
                case 'one': {
                    cur = { "current": [] };
                    if ((obj[action.payload.name].select[1] == 'req') || (obj[action.payload.name].current[0] != action.payload.current)) cur = { "current": [action.payload.current] };
                }
                    break;
                case 'multi': {
                    cur = { "current": [...obj[action.payload.name].current] };

                    if (!cur.current.includes(action.payload.current)) {
                        cur.current.push(action.payload.current);
                    } else if ((obj[action.payload.name].select[1] == 'noreq') || cur.current.length > 1) {
                        cur.current.splice([cur.current.indexOf(action.payload.current)], 1);
                    }

                }
                    break;
                default:
                    break;
            }
            obj[action.payload.name] = { ...obj[action.payload.name], ...cur };
            // calcPrice(obj);


            return {
                ...state,
                options: obj,
                price: (state.product.price + calcOptionsPrice(obj)) * state.count
            }
        }

        case 'PRODUCT_INCREMENT': {
            return {
                ...state,
                count: state.count + 1,
                price: (state.product.price + calcOptionsPrice(state.options)) * (state.count + 1)
            }
        }
        case 'PRODUCT_DECREMENT': {
            if (state.count < 2) return { ...state };
            return {
                ...state,
                count: state.count - 1,
                price: (state.product.price + calcOptionsPrice(state.options)) * (state.count - 1)
            }
        }
        case 'CLEAR_PRODUCT': {
            return {
                ...initialState,

            }

        }
        default:
            return state;
    }

}

export default product;