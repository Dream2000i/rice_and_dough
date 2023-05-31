import { Link } from 'react-router-dom';


export function getMenu() {
    
}

export default function MenuList() {
    return (
        <ul className='menu_site'>
            {/* <li> <a href="#goods_menu">Меню</a> </li> */}
            <li><Link to="/delivery">Доставка и оплата</Link></li>
            <li><Link to="/sale">Акции</Link></li>
            <li><Link to="/contats">Контакты</Link></li>
            <li><Link to="/about">О нас</Link></li>
        </ul>
    );
}