import { NavLink } from 'react-router-dom';

export default function MenuList({logout=f=>f}) {
    return (
        <header className='header_menu'>
            <ul className='menu_site'>
                <li><NavLink to="/discounts">Discounts</NavLink></li>
                <li><NavLink to="/orders">Orders</NavLink></li>
                <li><NavLink to="/goods">GoodsEdit</NavLink></li>
                <li><NavLink to="/synch">Iiko synch</NavLink></li>
                <li><NavLink to="/statistics">Statistics</NavLink></li>
                <li onClick={logout}><a href="/">Logout</a></li>
            </ul>
        </header>

    );
}