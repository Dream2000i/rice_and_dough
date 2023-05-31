import './Contakts.scss';
import { YaMaps } from '../../Containers'

export default function Contakts() {




    return (
        <>

            <div className='contankt_page' >
                <h2 className='header_page'>
                    Контакты
                </h2>
                <div className="page_text_content" id='contakt_content'>
                    <p>
                        Наше кафе находится по адресу: г.Вологда, ул. Марии Ульяновой, д. 22.
                    </p>
                    <p>
                        Работаем с пн - чет,вс с 12-00 до 22-00, пт,сб с 12-00 до 23-00
                    </p>
                    <p>
                        Заказы принимаем по телефону 580-600, либо через сайт
                    </p>
                    <p>
                        Так же у нас есть группа где можно узнать последние новости и акции на
                        <a href="https://vk.com/volrise"> нашей странице Вконтакте</a>
                    </p>

                </div>
                <YaMaps />

            </div>

        </>
    );
}