import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartInLocal } from "../../redux/actions/cart";
import { fetchGoods } from "../../redux/actions/goods";
import { fetchSettings } from "../../redux/actions/settings";
import { YMInitializer } from 'react-yandex-metrika';


const defaultPage = (history) => {
    if (history.location.pathname == '/') history.push('/pizza');

}


// const defaultPage = (history, hhours) => {
//     console.log(hhours);
//     if (history.location.pathname !== '/') return;
//     history.push(hhours ? '/hhours' : '/pizza');
// }

export default function Site({ children }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { hhours, metrika } = useSelector(({ settings }) => settings);


    console.log(metrika);

    useEffect(() => {

        dispatch(fetchGoods());
        dispatch(fetchSettings());
        dispatch(cartInLocal());
        defaultPage(history);
    }, [])

    useEffect(() => {
        if (hhours) history.push('/hhours');

        // if (hhours === null) return;
    }, [hhours])

    return <>
        {children}
        {
            metrika?.on && <YMInitializer accounts={metrika.id} options={{ webvisor: true }} />
        }
         {/* <YMInitializer accounts={[88611290]} options={{ webvisor: true }} /> */}
    </>
}