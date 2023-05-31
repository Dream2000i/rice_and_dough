export const getModificId = (id, type, size) => id + '_' + type + '_' + size;


export const addProductToCart = (product) => (
    {
        type: 'ADD_PRODUCT_CART',
        payload: product
    }
);

export const cartItemIncrement = (id) => ({
    type: 'ITEM_INCREMENT',
    payload: id
})

export const cartItemDecrement = (id) => ({
    type: 'ITEM_DECREMENT',
    payload: id
})

export const removeCartItem = (id) => ({
    type: 'REMOVE_CART_ITEM',
    payload: id
})

export const cartInLocal = () => ({
    type: 'CART_IN_LOCAL'
})


export const clearCart = () => ({
    type: 'CLEAR_CART'
});





