import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from "../../redux/actions/cart";

import Cart from '../../Components/Cart/Cart';
import CartList from './CartList';
import Order from './Order';
import PromoCode from './PromoCode';



// biz , transport

const applyDiscount = (price, discount) => {
    if (discount == '0') return 0;
    let disc = discount;
    if (disc.toString().slice(-1) === '%') {
        return Math.floor(price - (price / 100 * Number(disc.toString().slice(0, -1))));
    } else if (disc.toString().slice(-1) === '₽') {
        return price - Number(disc.toString().slice(0, -1));
    }
    return price - disc;

}

export default function CartRoot({ closed }) {
    const dispatch = useDispatch();
    const { totalPrice, totalCount, discount } = useSelector(({ cart }) => cart);

    const [orderPage, setOrderPage] = useState(false);
    const [orderPush, setOrderPush] = useState(false);

    const toggleCartPage = () => setOrderPage(prev => !prev);

    const handleClickClearCart = () => {
        if (window.confirm("Вы точно хотите очистить корзину?")) dispatch(clearCart());
    }



    return (
        <>
            <Cart
                {...{
                    orderPush,
                    totalPrice,
                    totalCount,
                    orderPage,
                    toggleButton: toggleCartPage,
                    clearButton: handleClickClearCart,
                    closed,
                    promoCode: <PromoCode />,
                    discountPrice: applyDiscount(totalPrice, discount)

                }}
            >
                {
                    orderPage
                        ?
                        <Order setPush={(id) => setOrderPush(id)} />
                        :
                        <CartList />
                }

            </Cart>
        </>
    );





}

