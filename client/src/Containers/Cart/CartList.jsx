import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, cartItemIncrement, cartItemDecrement } from "../../redux/actions/cart";
import { setDataOrder, orderDataClear } from "../../redux/actions/order";

import { CartItem } from '../../Components';



export default function CartList() {
    const dispatch = useDispatch();
    const { items } = useSelector(({ cart }) => cart);
    const { tableware } = useSelector(({ order }) => order);
    const { img: tableWareImg } = useSelector(({ settings }) => settings).tableWare;


    const handleClickIncrement = (id) => dispatch(cartItemIncrement(id));
    const handleClickDecrement = (id) => dispatch(cartItemDecrement(id));
    const handleClickRemove = (id) => {
        if (window.confirm("Вы точно хотите удалить данную позицию?")) dispatch(removeCartItem(id));
    }

    const tableWareInc = () => {
        if (tableware < 10) dispatch(setDataOrder({ tableware: tableware + 1 }));
    }
    const tableWareDec = () =>  dispatch(setDataOrder({ tableware: tableware - 1 }));
    const tableWareRemove = () =>  dispatch(setDataOrder({ tableware: 0 }));

  



    return (
        <>
            {
                items && Object.values(items).map((item, i) =>

                    <CartItem
                        {...item}
                        itemIncrement={() => handleClickIncrement(item.id)}
                        itemDecrement={() => handleClickDecrement(item.id)}
                        itemRemove={() => handleClickRemove(item.id)}
                    />

                )
            }
            <hr />
            {
                <CartItem
                    name="Комплект столовых приборов"
                    imageUrl={tableWareImg}
                    count={tableware}
                    itemIncrement={tableWareInc}
                    itemDecrement={tableWareDec}
                    itemRemove={tableWareRemove}
                />
            }
        </>


    );
}

