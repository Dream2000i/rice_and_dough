import './Footer.scss';
import MenuList from '../MenuList/MenuList';


export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_content">
                    <div className="menu">
                        <MenuList />
                    </div>
                    <div className="copyrate">
                        <h4>
                            © ИП Кудряшов М.И. 2022
                        </h4>
                    </div>
                </div>

            </div>
        </footer>
    );
}