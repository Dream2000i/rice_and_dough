import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header,{ContaktBLock} from '../Components/Header/Header';
import { ButtonOrange, CartButton } from '../Components/UI'

import MenuList from '../Components/MenuList/MenuList'; 




export default function TopSite() {
    const menu = useRef();

    const [openMenu, setOpenMenu] = useState(false);
    const [cartActive, setCartActive] = useState(false);

    const { totalPrice, totalCount } = useSelector(({ cart }) => cart);
    const { work } = useSelector(({ settings }) => settings);

    const currentWorkDay = work ? work.time[work.day[new Date().getDay()]] :'';
    console.log(work,currentWorkDay);

   
    

    const menuToggle = (e) => {
         e.stopPropagation();
        setOpenMenu(prev => !prev);
    }
    const handleOutSideClick = (event) => {
        if (!event.path.includes(menu.current) || event.target.closest('li')) setOpenMenu(false);
    }

    useEffect(() => {
        if (totalCount) {
            setCartActive(true);
            let timerFunc = setTimeout(() => {
                setCartActive(false);
            }, 200);
            return () => clearTimeout(timerFunc);
        }
    }, [totalCount]);

    useEffect(() => {
        document.addEventListener('click', handleOutSideClick);
        return () => document.removeEventListener('click', handleOutSideClick);
    }, []);
    
    return (
        <>
        <ContaktBLock work={currentWorkDay}/>
  <Header 
    openMenu={openMenu}
    menuToggle={menuToggle}
    menuList={<MenuList/>}
    menuRef={menu}
        >
            
                        <Link to="/cart">
                            <ButtonOrange currentClass={`cart_button ${cartActive ? 'activeCart' : ''}`}>
                                <CartButton {...{ totalPrice, totalCount }} />
                            </ButtonOrange >
                        </Link>
        </Header >
        </>     
    );
}




// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';



// import { ButtonOrange, CartButton } from '../../UI'

// import MenuList from '../../MenuList/MenuList';

// import './Header.scss';



// export default function Header() {

//     const [openMenu, setOpenMenu] = useState(false);
//     const [cartActive, setCartActive] = useState(false);

//     const { totalPrice, totalCount } = useSelector(({ cart }) => cart);

//     const menuToggle = () => {
//         setOpenMenu(prev => !prev);
//     }


//     useEffect(() => {
//         if (totalCount) {
//             setCartActive(true);
//             let timerFunc = setTimeout(() => {
//                 setCartActive(false);
//             }, 200);
//             return () => clearTimeout(timerFunc);
//         }
//     }, [totalCount]);


//     return (
        
//         <header className="header">
//             <div className="container">
//                 <div className="header_content">
//                     <div className="grid-item logo">

//                     </div>
//                     <div className="grid-item header_menu">
//                         <MenuList />
//                     </div>

//                     <div className="grid-item cart_block">
//                         <Link to="/cart">
//                             <ButtonOrange currentClass={`cart_button ${cartActive ? 'activeCart' : ''}`}>
//                                 <CartButton {...{ totalPrice, totalCount }} />
//                             </ButtonOrange >
//                         </Link>
//                     </div>
//                     <div className={`grid-item h_menu ${openMenu ? 'open' : ''}`}>
//                         <button className='h_menu_button' onClick={menuToggle}>
//                             <span></span>
//                         </button>
//                         <div className='menu'>
//                             <MenuList />
//                         </div>


//                     </div>
//                 </div></div>

//         </header>
//     );
// }

// import './ContaktBLock.scss';

// export default function ContaktBLock() {
//     return (
//         <div className='contakt_block'>


//             <div className="container">
//                 <div className="content">
//                     <div className="phone">
//                         <h3>📞580-600</h3>
//                     </div>
                    
//                     <div className="time">
//                         Доставка за 59 минут!
//                     </div>
//                     <div className='work'> <span>Работаем</span> c 09 до 23-00 </div>

//                     <div className="adress"> <span>Самовывоз:</span>  г.Вологда, М. Ульяновой, 22 </div>

//                 </div>
//             </div>
//         </div>
//     );

// }