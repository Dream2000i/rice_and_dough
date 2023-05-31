import axios from "axios";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDataOrder, orderDataClear } from "../../redux/actions/order";
import { clearCart } from "../../redux/actions/cart";

import { backend_phone_validation, backend_add_order, writeResponse } from '../../backend.js';


import { Marker, ButtonOrange, MyInput, Counter } from '../../Components/UI'

export default function Order({ setPush = f => f }) {


    const dispatch = useDispatch();
    const { name, phone, delivery, pay, street, house, apartment, porch, level, comment, tableware, promoCode } = useSelector(({ order }) => order);
    const { totalPrice, items: cartItems } = useSelector(({ cart }) => cart);


    const [authCodeReguest, setAuthCodeReq] = useState(false);
    const [authId, setAuthId] = useState();
    const [authCode, setAuthCode] = useState();

    const setName = (name) => dispatch(setDataOrder({ name }));
    const setPhone = (phone) => dispatch(setDataOrder({ phone }));
    const setDelivery = () => dispatch(setDataOrder({ delivery: !delivery }));
    const setPay = (i) => dispatch(setDataOrder({ pay: i }));
    const setStreet = (street) => dispatch(setDataOrder({ street }));
    const setHouse = (house) => dispatch(setDataOrder({ house }));
    const setPorch = (porch) => dispatch(setDataOrder({ porch }));
    const setLevel = (level) => dispatch(setDataOrder({ level }));
    const setApartament = (apartment) => dispatch(setDataOrder({ apartment }));
    const setComment = (comment) => dispatch(setDataOrder({ comment }));
    const tableWareInc = () => {
        if (tableware < 10) dispatch(setDataOrder({ tableware: tableware + 1 }));
    }
    const tableWareDec = () => {
        if (tableware > 0) dispatch(setDataOrder({ tableware: tableware - 1 }));
    }
    const clearOrder = () => {
        dispatch(clearCart());
        dispatch(orderDataClear());
    }

    const convertAdressToString = () => {
        if (!delivery) return '';
        return `ул. ${street}, д. ${house}, кв. ${apartment}, эт. ${level}, под. ${porch}, `
    };

    const convertCartToOrder = () => {
        const goods = [];
        Object.values(cartItems).map(item => {
            goods.push({
                id: item.idProduct,
                name: item.name,
                count: item.count,
                options: item.optionsString
            });
        })

        return goods;
    }


    const phoneValidator = (e) => {
        let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if (phone.split('').filter(item => Number(item) || item == 0).length < 10 || !regexp.test(phone)) return setPhone(false);
    }

    const phoneFocus = (e) => setPhone('+7');


    const orderValidation = () => {
        if (!name || !phone || (delivery && (!street || !house))) {
            alert('не введены все данные для оформления заказа!');
            return false;
        }
        return true;
    }
    const phoneValidation = () => {
        if (!orderValidation()) return;
        axios.post(backend_phone_validation, phone)
            .then(resp => {
                if (writeResponse(resp.data)) {
                    setAuthId(resp.data.data.auth_id)
                    setAuthCodeReq(true);
                }

            });

    };

    const pushOrder = () => {
        if (!orderValidation()) return;

        const newOrder = {
            data: {
                name,
                phone,
                delivery,
                adress: convertAdressToString(),
                sum: totalPrice,
                pay,
                comment,
                tableware,
                promo_code: promoCode
            },
            goods: convertCartToOrder(),
            authId, authCode
        };

        axios.post(backend_add_order, newOrder)
            .then(resp => {
                if (writeResponse(resp.data)) {
                    clearOrder();
                    setPush(resp.data.data.id);
                    const warn = resp.data.data.warn;
                    if (warn) alert(warn);
                }
            });

    }



    return (
        <>
            {!authCodeReguest ?
                <>
                    <label>
                        <h3>Ваше Имя</h3>
                        <MyInput value={name} setValue={setName} errors='введите Ваше имя (не менне 2 символов)' />
                    </label>
                    <label>
                        <h3>Номер Телефона</h3>
                        <MyInput value={phone} setValue={setPhone} validation={phoneValidator} errors='введите номер телефона в правильном формате' focus={phoneFocus} />
                    </label>

                    <div className='delivery_method'>
                        <h3>Способ получения заказа:</h3>
                        <ul>
                            <Marker active={delivery} click={setDelivery}>Доставка</Marker>
                            <Marker active={!delivery} click={setDelivery}>Cамовывоз</Marker>
                        </ul>
                    </div>
                    <div className='pay_method'>
                        <h3>Способ оплаты заказа:</h3>
                        <ul>
                            <Marker active={pay == 0} click={() => setPay(0)}>Наличными</Marker>
                            <Marker active={pay == 1} click={() => setPay(1)}>Картой</Marker>
                            {/* <Marker active={pay == 2} click={() => setPay(2)}>Онлайн оплата</Marker> */}
                        </ul>
                    </div>
                    {/* <div className="tableware">
                            <h3>Количество столовых приборов </h3>
                            <Counter
                                counter={tableware}
                                unit=" шт."
                                increment={tableWareInc}
                                decrement={tableWareDec}
                            />
                            
                        </div> */}
                    {
                        delivery && <div className='delivery_detail'>
                            <h3 className='delivery_detail_header'>Адрес доставки</h3>
                            <label className='street'>
                                <h3>улица</h3>
                                <MyInput value={street} setValue={setStreet} errors='введите улицу' />
                            </label>
                            <label>
                                <h3>дом</h3>
                                <MyInput value={house} setValue={setHouse} errors='введите № дома' />
                            </label>
                            <label>
                                <h3>подъезд</h3>
                                <MyInput value={porch} setValue={setPorch} />
                            </label>
                            <label>
                                <h3>этаж</h3>
                                <MyInput value={level} setValue={setLevel} />
                            </label>
                            <label>
                                <h3>Квартира</h3>
                                <MyInput value={apartment} setValue={setApartament} />
                            </label>
                        </div>

                    }

                    <label className='comment'>
                        <h3>Комментарий</h3>
                        <textarea type="text" onInput={(e) => setComment(e.target.value)} value={comment} />
                    </label>
                    <ButtonOrange click={pushOrder}>
                        Подтвердить заказ
                    </ButtonOrange >

                    {/* <ButtonOrange click={phoneValidation}>
                        Отправить код авторизации
                    </ButtonOrange > */}
                </>
                :
                <>
                    {/* <label className='auth_code'>
                        <h3>код авторизации отправлен на номер {phone}</h3>
                        <MyInput value={authCode} setValue={setAuthCode} errors='введите правильный код авторизации' />
                    </label>

                    <ButtonOrange click={pushOrder}>
                        Подтвердить заказ
                    </ButtonOrange >
                    <ButtonOrange currentClass="new_code" click={phoneValidation}>
                        Отправить код повторно
                    </ButtonOrange > */}
                </>
            }

        </>
    );
}