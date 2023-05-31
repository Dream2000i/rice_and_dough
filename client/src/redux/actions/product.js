import axios from "axios";


// ОБЪЕДЕНИТЬ В ОДИН ЗАПРОС
export const fetchProduct = (id, category) => (dispatch) => {
    // dispatch(setLoaded(false));
    axios.get(`http://localhost:3000/${category}`)
        .then(resp => {
            resp.data.map(item => {
                if (item.id == id) dispatch(setProduct(item,category));
            });


        });
}
export const fetchOption = (category) => (dispatch) => {
    axios.get(`http://localhost:3000/optionsName/`)
        .then(resp => dispatch(setOptions(resp.data[category])));
}



export const setProduct = (product,category) => (
    {
        type: 'SET_PRODUCT',
        payload: {product,category}
    }
);



export const setOptions = (options) => (
    {
        type: 'SET_OPTIONS',
        payload: options
    }
);


export const selectOptions = (name, current) => (
    {
        type: 'SELECT_OPTIONS',
        payload: { name, current }
    }
);



export const clearProduct = () => (
    {
        type: 'CLEAR_PRODUCT',
        
    }
);

export const productIncrement = () => (
    {
        type: 'PRODUCT_INCREMENT',
        
    }
);

export const productDecrement = () => (
    {
        type: 'PRODUCT_DECREMENT',
        
    }
);
