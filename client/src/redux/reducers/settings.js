
export const sortFunction = [
    (a, b) => b['rating'] - a['rating'],
    (a, b) => a['price'] - b['price'],
    (a, b) => {
        if (a['name'] < b['name']) return -1;
        if (a['name'] === b['name']) return 0;
        if (a['name'] > b['name']) return 1;
    }


];


const initialState = {
    categoryNames: {},
    subCategoryNames: {},
    sortList: [
        { label: 'Популярности', name: 'rating', fSort: sortFunction[0] },
        { label: 'Цене', name: 'price', fSort: sortFunction[1] },
        { label: 'Алфавиту', name: 'name', fSort: sortFunction[2] },
    ],
    slider: [],
    menuList: [],
    hhours:null,
    tableWare:{
        img:""
    }
}




const settings = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SETTINGS':
            return {
                ...state, ...action.payload
            }
            
        default:
            return state;
    }

}

export default settings;