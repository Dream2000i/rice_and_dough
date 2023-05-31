import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setSubCategory, setSortBy } from "../../redux/actions/filters";
import { useEffect } from 'react';
import ContextMenu from '../../Components/UI/ContextMenu';
import { Nav } from '../../Components';




const categoryToMenu = (category = {}) => {
    const categoryMenu = [];
    Object.keys(category).map((item, i) =>  {
        categoryMenu.push(<NavLink key={'link_' + i} children={category[item]} to={'/' + item} />)
    });
    return categoryMenu;
};




export default function MenuGoods() {
    const dispatch = useDispatch();
    const { categoryNames, subCategoryNames, sortList } = useSelector(({ settings }) => settings);
    const { category, subcategory, sortBy } = useSelector(({ filters }) => filters);

    const subCategoryVisible = useSelector(({ goods }) => goods.items.hasOwnProperty(category) ? goods.items[category].subCategoryVisible : []);


    const subCategoryList = ['Все'].concat(Object.keys(subCategoryNames).map(key => {
        if (subCategoryVisible.includes(Number(key))) return subCategoryNames[key];
    }));

   


    const filtersToggle = (i) => dispatch(setSubCategory(i));
    const sortToggle = (i) => dispatch(setSortBy(i));


    const filtersBlock =
        <ContextMenu name='Фильтр:'
            option={subCategoryList}
            current={subcategory}
            toggle={filtersToggle} />;


    const sortBlock =
        <ContextMenu
            name='Сортировать: по '
            option={sortList.map(item => item.label)}
            current={sortBy}
            toggle={sortToggle} />;

    useEffect(() => {
        if (subcategory != 0) dispatch(setSubCategory(0));
    }, [category]);

    return (
        <Nav
            categories={categoryToMenu(categoryNames)}
            contextMenu={[ sortBlock,filtersBlock]}
        />

    );
}