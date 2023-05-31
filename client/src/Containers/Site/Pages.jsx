import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';

import { setCategory } from '../../redux/actions/filters';

import GoodsOptions from '../Goods/GoodsOptions';


import { ModalWindow } from '../../Components/UI'
import { Cart, Contakts, About, Delivery, Sale, HappyHours } from '../../Components';
import CartRoot from '../Cart/CartRoot';

// import About from '../../Components/Pages/About';
// import Contacts from './Contacts';


import settings from '../../redux/reducers/settings';


const EmptyPage = () => <div className='empty_content'>CONTENT PAGE</div>;

const rout = [

    { path: '/*/:id', Comp: GoodsOptions },
    { path: '/cart', Comp: CartRoot },
    { path: '/about', Comp: About },
    { path: '/contats', Comp: Contakts },
    { path: '/sale', Comp: Sale },
    { path: '/delivery', Comp: Delivery },
    { path: '/hhours', Comp: HappyHours },


]

function SetCategoryGoods({ urlCategory = '' }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCategory(urlCategory))
    }, []);
    return <></>;
}


export default function Pages() {
    const history = useHistory();
    const { category } = useSelector(({ filters }) => filters);
    // const menu = ['pizza', 'roll', 'shawarma', 'snacks', 'pies', 'drinks'];
    const menu = Object.keys(useSelector(({ settings }) => settings.categoryNames));




    const back = () => {
        let array = history.location.pathname.split('/');
        let url = '/';
        array.slice(1, array.length - 1).map(item => url += item + '/');
        if (url == '/') url = '/' + category;
        history.push(url);
    }

    return (
        <>
            <Switch>
                {
                    menu.map((item, i) =>
                        <Route key={i} path={'/' + item} render={() =>
                            <SetCategoryGoods urlCategory={item ? item : ''} />
                            // <GoodsArea currentCategory={item ? item : ''} />
                        } />
                    )
                }

            </Switch>

            {
                rout.map(({ path, Comp }) => (
                    <Route key={path} exact path={path}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                unmountOnExit
                            >
                                {

                                    path !== '/hhours'
                                        ? <ModalWindow closed={back}>
                                            <Comp closed={back} />
                                        </ModalWindow>
                                        :
                                        <Comp closed={back} />

                                }

                            </CSSTransition>
                        )}
                    </Route>

                ))
            }

        </>
    );
}