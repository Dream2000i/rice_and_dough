const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
    discount: 0

}

const goodsId = (category, goodId, options) => {
    let id = `${category}_${goodId}`;
    Object.values(options).map(item => {
        if (item.current.length) {

            id += `_o${item.id}-${item.current.join('-')}`;
        }
    })
    return id;
}


const setLocalCart = (obj) => {
    const { items, totalPrice, totalCount } = obj;
    const cart = { items, totalPrice, totalCount };
    try {
        localStorage.removeItem('cart');
        const date = new Date().getTime() + (1 * 3600 * 1000);
        const local = {
            cart: cart,
            result: true,
            date
        }
        const cryptArray = JSON.stringify(local).split('').map(value => value.charCodeAt(0) + 3);
        const code = cryptArray.reduce((acc, num) => acc + num, 0);
        const string = code + 'x' + cryptArray.join('x');

        localStorage.setItem('cart', string);
        return true;
    } catch (e) {
        return false;
    }

}

const getLocalCart = () => {

    try {
        const [code, ...localData] = localStorage.getItem('cart').split('x');

        if (code != localData.reduce((acc, num) => Number(acc) + Number(num), 0)) {
            localStorage.removeItem('cart');
            return false;
        }

        const { result, date, cart } = JSON.parse(String.fromCharCode(...(localData.map(value => value - 3))))
        console.log(date);
        if (new Date().getTime() > date || !result) {
            localStorage.removeItem('cart');
            return false;
        }

        return cart;

    } catch (e) {
        localStorage.removeItem('cart');
        return false;
    }

}




const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_IN_LOCAL': {
            const cart = getLocalCart();
            console.log(cart);
            if (!cart) return {
                ...state
            }
            return {
                ...state,
                ...cart
            }
        }


        case 'ADD_PRODUCT_CART': {
            const data = action.payload;
            const id = goodsId(data.goodsCategory, data.product.id, data.options);

            const newItems = {
                ...state.items
            }
            if (!state.items[id]) {

                const currentOptions = {};
                Object.values(data.options).map(item => {
                    let array = [];
                    item.option.map((opt, i) => {
                        if (item.current.includes(i)) {
                            array.push(opt[0]);
                            currentOptions[item.label] = array;
                        }
                    })
                })
                let optionsString = '';

                Object.keys(currentOptions).map((key, i) => {
                    optionsString += `${key}: ${currentOptions[key].join(', ')}, `;
                }
                );
                const obj = {
                    name: data.product.name,
                    id: id,
                    idProduct: data.product.id,
                    imageUrl: data.product.imageUrl,
                    price: data.price,
                    count: data.count,
                    goodsCategory: data.goodsCategory,
                    options: currentOptions,
                    optionsString
                }
                newItems[id] = {
                    ...obj
                }

            } else {
                newItems[id].count += data.count;
                newItems[id].price += data.price;
            };

            const newState = {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice + data.price,
                totalCount: state.totalCount + data.count
            }


            setLocalCart(newState);

            return {
                ...state,
                ...newState
            }

        }


        case 'REMOVE_CART_ITEM': {
            const newItems = {
                ...state.items
            }

            const currentPrice = newItems[action.payload].price;
            const currentCount = newItems[action.payload].count;

            delete newItems[action.payload];

            const newState = {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentPrice,
                totalCount: state.totalCount - currentCount
            }

            setLocalCart(newState);

            return {
                ...state,
                ...newState
            }
        }
        case 'ITEM_INCREMENT': {
            console.log(action.payload);
            const incPrice = state.items[action.payload].price / state.items[action.payload].count;

            const newItems = {
                ...state.items,
                [action.payload]: {
                    ...state.items[action.payload],
                    count: state.items[action.payload].count + 1,
                    price: state.items[action.payload].price + incPrice
                }
            }



            const newState = {
                ...state,
                items: newItems,
                totalCount: state.totalCount + 1,
                totalPrice: state.totalPrice + incPrice
            }

            setLocalCart(newState);

            return {
                ...state,
                ...newState
            }
        }
        case 'ITEM_DECREMENT': {
            const decPrice = state.items[action.payload].price / state.items[action.payload].count;

            const newItems = {
                ...state.items,
                [action.payload]: {
                    ...state.items[action.payload],
                    count: state.items[action.payload].count - 1,
                    price: state.items[action.payload].price - decPrice
                }
            }
            const newState = {
                ...state,
                items: newItems,
                totalCount: state.totalCount - 1,
                totalPrice: state.totalPrice - decPrice
            }

            setLocalCart(newState);

            return {
                ...state,
                ...newState
            }


        }
        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            return {
                ...initialState
            }
        case 'APPLY_DISCOUNT': {

            const newState = {
                ...state,
                discount: action.payload,
            }
            setLocalCart(newState);

            return {
                ...state,
                ...newState
            }
        }

        default:
            return state;
    }

}

export default cart;