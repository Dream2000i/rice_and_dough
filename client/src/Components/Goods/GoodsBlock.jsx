// import './GoodsBlock.scss'
import { Link } from "react-router-dom";
import { ButtonOrange } from "../UI";

export default function GoodsBlock({ name, price, imageUrl, id, category, structure, productClick = f => f }) {
    return (
        <div className="goods_block" onClick={productClick}>
            <h2>{name}</h2>
            <img src={imageUrl} alt="name" />
            <div className="descript">
                <p><h3>Состав: </h3>{structure}</p>
            </div>
            <div className='price'><span>{price} ₽</span></div>
            <ButtonOrange currentClass="to_cart" > Выбрать </ButtonOrange>
        </div>
    );
}