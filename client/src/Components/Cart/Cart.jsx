import { ButtonOrange } from '../UI'
import './Cart.scss';



// biz , transport


const CartEmpty = ({ closed }) => <div className='empty_content' onClick={closed}>В Вашей корзиней сейчас нет товаров :(</div>
const OrderPush = ({ closed, id = '...' }) => <div className='empty_content' onClick={closed}>Ваш заказ № {id} успешно добавлен, оператор свяжется с вами в ближайшее время</div>


export default function Cart({
    children = <></>,
    totalCount = 0,
    totalPrice = 0,
    discountPrice = 0,
    orderPage = false,
    toggleButton = f => f,
    clearButton = f => f,
    orderPush = false,
    closed = f => f,
    promoCode = <></>

}) {


    if (orderPush) return <OrderPush closed={closed} id={orderPush} />
    if (!totalCount) return <CartEmpty closed={closed} />

    return (
        <>
            <div className='cart'>
                <div className='cart_header'>
                    <h3>В Вашей корзине {totalCount} товаров на сумму
                        {
                            discountPrice ? <> <span style={{ textDecoration: 'line-through' }}>{totalPrice}</span> {discountPrice}</> : <> {totalPrice}</>
                        } руб.


                        {/* {promoCode.write ? <><span style={{ color: 'red' }}> с учетом скидки по промокоду</span></> : <></>} на сумму {totalPrice} руб. */}

                    </h3>
                    <div className='promo_code_write'>
                        {promoCode}
                    </div>
                    {/* {totalPrice < 500 */}
                    {/* ? <h4 style={{ color: "red" }}>Стомость доставки при заказе до 500 руб. - 100 руб.</h4> */}
                    {/* :  */}
                    <h4>Доставка бесплатно!</h4>
                    {/* } */}
                    <div className='button_container'>
                        <ButtonOrange currentClass='button_order' click={toggleButton} >{
                            orderPage ?
                                <>Назад к списку товаров</> : <>Оформить заказ</>}</ButtonOrange>
                        {!orderPage && <ButtonOrange currentClass='button_clear' click={clearButton} >Очистить корзину</ButtonOrange>
                        }
                    </div>
                </div>

                <div className={(totalCount > 0 && orderPage) ? 'order_page' : 'cart_list'}>
                    {children}
                </div>
            </div>
        </>
    );





}


