import { Link } from 'react-router-dom';


import './Sale.scss';

export default function Sale() {
    const backend_sale_img = `http://api.580600.ru/`;

    return (
        <>
            <h2 className="header_page">Акции и спецпредложения!</h2>
            <div className="page_text_content ">
                <div className="sale">
                    <h3>Акция Счастливые часы! <br/>При заказе в дни понедельник - четверг
                    <br />с 14:00 до 18:00 скидка 10% на все меню!*
                        <br />
                        <span style={{fontSize:'10px'}}>*скидка не распространяется на сеты и комбо! Цены на сайте указаны с учетом скидки!</span>
                         </h3>
                        
                    <Link to="/sets/306">
                        <h3> Супер-акция! 5 нежнейших запеченных ролла всего за 999 руб! </h3>
                        <img src={`${backend_sale_img}resources/goodsImg/sets/ccd9469df2212c89180a34d3e1c88872.jpeg`} alt="" />
                    </Link>
                    {/* <Link to="/sets/228">
                        <h3>Любителям сыра! Средняя пицца "4 сыра", и сырные палочки за 700 руб.</h3>
                    </Link> 
                    <img src={`${backend_sale_img}resources/goodsImg/sets/a3da941830d67f26742876dc3267f97d.jpeg`} alt="" />*/}
                    <Link to="/sets/230">
                        <h3>К-к-к-к-комбо!!! 3 средних пиццы: маргарита, алла-белла и ветчина и грибы всего за 999 рублей!</h3>
                        <img src={`${backend_sale_img}resources/goodsImg/sets/e6402ef1a6e15d891b6a42a5172b01af.jpeg`} alt="" />

                    </Link>
                </div>
            </div>
        </>
    );
}



