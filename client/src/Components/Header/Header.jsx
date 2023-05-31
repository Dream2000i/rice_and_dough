import './Header.scss';
import './ContaktBLock.scss';



export default function Header({
    openMenu = false,
    menuToggle = f => f,
    menuList = <></>,
    menuRef,
    children
}) {

    return (    

        <header className="header">
            <div className="container">
                <div className="header_content">
                    <div className="grid-item logo">

                    </div>
                    <div className="grid-item header_menu">
                        {menuList}
                    </div>

                    <div className="grid-item cart_block">
                       {children}
                    </div>
                    <div className={`grid-item h_menu ${openMenu ? 'open' : ''}`}>
                        <button className='h_menu_button' onClick={menuToggle}>
                            <span></span>
                        </button>
                        <div className='menu' ref={menuRef}>
                            {menuList}
                        </div>
                    </div>
                </div></div>

        </header>
    
    );
}

export function ContaktBLock({work=""}) {
    return (
        <div className='contakt_block'>


            <div className="container">
                <div className="content">
                    <div className="phone">
                        <h3> <a  href="tel:580-600">📞580-600</a> </h3>
                    </div>
                    
                    <div className="time">
                        Доставка за 59 минут!
                    </div>
                    <div className='work'> <span>Сегодня</span> {work} </div>

                    <div className="adress"> <span>Самовывоз:</span>  г.Вологда, М. Ульяновой, 22 </div>

                </div>
            </div>
        </div>
    );

}