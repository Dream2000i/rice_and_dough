import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { setSubCategoryVisible } from "../../redux/actions/filters";


import { GoodsList, GoodsBlock, LoadingBlock } from '../../Components';





export default function GoodsArea() {

    const dispatch = useDispatch();
    const history = useHistory();


    const isLoaded = useSelector(({ goods }) => goods.isLoaded);
    const { category, subcategory, sortBy } = useSelector(({ filters }) => filters);
    const fSort = useSelector(({ settings }) => settings.sortList.hasOwnProperty(sortBy) ? settings.sortList[sortBy].fSort : f => f);
    const goods = useSelector(({ goods }) => goods.items.hasOwnProperty(category) ? goods.items[category].items : []);



    const toGoodsOptions = (category, id) => history.push(`/${category}/${id}`);

    


    // console.log('GOODS_AREA_RENDER:');

    // console.log(goods, isLoaded, category, subcategory, sortBy, fSort);

    return (
        <>
            <GoodsList>
                {
                    isLoaded ?
                        goods.sort(fSort).map((item, i) =>  (item.subcategory == subcategory || subcategory == 0)
                            ?
                            <GoodsBlock {...item} key={'gblock'+item.id} category={category} productClick={() => toGoodsOptions(category, item.id)} />
                            : <></>
                        )
                        :
                        Array(10).fill(0).map((item, index) => <LoadingBlock key={item + '_' + index} />)


                }
            </GoodsList>

        </>
    );
}


