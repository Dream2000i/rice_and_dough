import './Nav.scss';

export default function Nav({ categories = [], contextMenu = [] }) {

    return (
        <nav className='nav' id='goods_menu'>

            <div className="container">
                <div className="navBlock">
                    <div className='menu'>
                        <ul>
                            {

                                categories && categories.map((item, i) => <li key={'nav_' + i}>{item}</li>)
                            }
                        </ul>
                    </div>

                    {/* поменять класс context_bloks */}
                    <div className="options"> 
                        {
                            contextMenu && contextMenu.map((item, i) => <>{item}</>  )
                        }

                    </div>


                </div>


            </div>

        </nav>
    );
}