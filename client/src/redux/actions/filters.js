export const setSortBy = (sortIndex) => (
    {
        type: 'SET_SORT_BY',
        payload: sortIndex
    }
);
export const setCategory = (category) => (
    {
        type: 'SET_CATEGORY',
        payload: category
    }
);
export const setSubCategory = (subCatIndex) => (
    {
        type: 'SET_SUBCATEGORY',
        payload: subCatIndex
    }
);

export const setSubCategoryVisible = (visbleArray) => (
    {
        type: 'SET_SUBCATEGORY_VISIBLE',
        payload: visbleArray
    }
);
