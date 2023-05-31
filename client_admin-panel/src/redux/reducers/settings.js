import { sortFunction } from '../../names';

const initialState = {
    categoryNames: {},
    subCategoryNames: {},
    sortList: [
        { label: 'Популярности', name: 'rating', },
        { label: 'Цене', name: 'price', fSort: sortFunction[1] },
        { label: 'Алфавиту', name: 'name', fSort: sortFunction[2] },
    ],
    slider: [],
    menuList:[]
}




const settings = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SETTINGS':
            return {
                ...state, ...action.payload
            }
        // case 'SET_':
        //     return {
        //         ...state, category: action.payload
        //     }

        default:
            return state;
    }

}

export default settings;