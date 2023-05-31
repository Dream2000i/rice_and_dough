import './GoodsCard.scss';
import { Counter, ButtonOrange } from '../UI'


export default function GoodsCard({ children, 
    loaded = false, 
    exists = false,
     product = {}, 
     price = 0, 
     count = 0, 
     countIncrement = f => f, 
     countDecrement = f => f, 
     addToCartClick = f => f }) {
        console.log(product);
    if (!loaded) return <div className='empty_content'>ЗАГРУЗКА...</div>;
    if (!exists && !product.name) return <div className='empty_content'>ТОВАР НЕ СУЩЕСТВУЕТ ИЛИ БЫЛ УДАЛЕН :(</div>;

    return (
        <div className='goodsOptions'>
            <h2 className='product_header'>{product.name}</h2>
            <h2 className='price' >{price} руб.</h2>
            <div className="count" >
                <Counter counter={count} increment={countIncrement} decrement={countDecrement} />
            </div>
            <ButtonOrange currentClass='to_cart' click={addToCartClick}>В корзину</ButtonOrange>
            <div className='product_img'>
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className='structure'>
                <p>{product.weight && <>Вес продукта : {product.weight} г., </>} Состав: {product.structure}</p></div>
            <div className='options'>
                {children}
            </div>


        </div>
    );
}