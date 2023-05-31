import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearProduct, selectOptions, productIncrement, productDecrement, setProduct, setOptions } from "../../redux/actions/product";
import { addProductToCart } from "../../redux/actions/cart";


import { GoodsCard } from '../../Components';
import {  Marker } from '../../Components/UI'


const getCurrentProductAndOptions = (id, category, goods) => {
    let product = goods.hasOwnProperty(category) ? goods[category].items.filter(item => item.id == id)[0] : false;
    let options = goods.hasOwnProperty(category) ? goods[category].optionsCategory : false;
    if (!product || !options) return false;
    return { product, options };
}


export default function GoodsOptions({ closed }) {
    const dispatch = useDispatch();

    const { 0: category, id } = useParams();
    // console.log(id);

    const { items: goods, isLoaded: goodsLoaded } = useSelector(({ goods }) => goods);
    const productAndOptions = getCurrentProductAndOptions(id, category, goods);


    const { product, options, price, count, isLoaded} = useSelector(({ product }) => product);


    const countIncrement = () => dispatch(productIncrement(product.id));
    const countDecrement = () => dispatch(productDecrement(product.id));
    const addOption = (name, current) => dispatch(selectOptions(name, current));
    const addToCart = () => { dispatch(addProductToCart({ product, options, price, count, category })) };


    const addToCartClick = () => {
        closed();
        addToCart();
    }

    useEffect(() => {
        if (!productAndOptions) return;
        dispatch(setProduct(productAndOptions.product, category));
        dispatch(setOptions(productAndOptions.options));
        return () => dispatch(clearProduct());
    }, [goods]);


    return (
        <GoodsCard
            loaded={goodsLoaded}
            exists={productAndOptions}
            {...{ price, count, product, countIncrement, countDecrement, addToCartClick }}
        >

            {
             (product.name != 'Кольцоне') && isLoaded && Object.keys(options).map((item, index) =>
                    <ul key={index} className='option'>
                        <h4>{options[item].label}:</h4>
                        {
                            options[item].option.map((it, i) =>
                                <Marker
                                    active={options[item].current.includes(i)}
                                    classType={options[item].select[0]}
                                    click={() => addOption(options[item].name, i)}
                                >
                                    {it[0]}
                                    {it[1] ? <>+ {it[1]} руб. </> : ''}
                                </Marker>
                            )
                        }
                    </ul>

                )
            }



        </GoodsCard>
    );
}