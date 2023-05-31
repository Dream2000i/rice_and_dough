export const setDataOrder = (value) => (
    {
        type: 'SET_ORDER_DATA',
        payload: value 
    }
);


export const orderDataClear = () => (
    {
        type: 'ORDER_DATA_CLEAR'
    }
);

export const setOrder = (name) => (
    {
        type: 'SET_ORDER_DATA',
        payload: { name: name }
    }
);

export const setPromoCodeToOrder = (code) => (
    {
        type: 'SET_PROMO_CODE',
        payload: code
    }
);





