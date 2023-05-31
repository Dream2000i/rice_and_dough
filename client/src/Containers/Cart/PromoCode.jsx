import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonOrange, MyInput } from '../../Components/UI'
import { applyDiscountToCart } from '../../redux/actions/cart';
import { setPromoCodeToOrder } from '../../redux/actions/order';
import { check_promo_code } from '../../backend';



export default function PromoCode() {

    const dispatch = useDispatch();

    const [isLoaded, setIsLoaded] = useState(false);
    const [codeInput, setCodeInput] = useState(false);

    const { promoCode } = useSelector(({ order }) => order);

    const applyPromoCode = () => {
        if (!codeInput) return;
        setIsLoaded(true);
        axios.post(check_promo_code, { code: codeInput })
            .then(({ data }) => {
                if (!data.result) {
                    setCodeInput(false);
                    setIsLoaded(false);
                    return alert(data.error);
                }
                dispatch(applyDiscountToCart(data.data.discount));
                dispatch(setPromoCodeToOrder(codeInput));

                alert(`Промокод применен, скидка ${data.data.discount}`);
                //добавить в ордер
                setIsLoaded(false);
            })
            .catch(e => {
                alert('Ошибка сервера:' + e);
                setIsLoaded(false);
            });

    }

    if (promoCode) return <>Промокод введен!</>
    if (isLoaded) return <>проверка промокода...</>


    return (
        <>
            Введите промокод: <MyInput
                value={codeInput}
                setValue={setCodeInput}

            />
          
                    <ButtonOrange click={applyPromoCode} currentClass="button_promo_code">Применить</ButtonOrange>
               
        </>
    )
};