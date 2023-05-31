import { removeCartItem } from '../../redux/actions/cart';
import { Counter, ButtonRemove } from '../UI'

export default function CartItem({
    imageUrl = '',
    name = '',
    count = 0,
    price = 0,
    options = {},
    itemIncrement = f => f,
    itemDecrement = f => f,
    itemRemove = undefined }) {

    return (
        <>
            {
                <div className='goods_string'>
                    <img src={imageUrl} alt={name} className='img' />
                    <h3 className='goods_name'>{name}</h3>
                    <div className='goods_counter'>
                        <Counter counter={count} increment={itemIncrement} decrement={count > 1 ? itemDecrement : itemRemove} />
                    </div>
                    {/* {
                        itemRemove &&   <div className='goods_remove'> <ButtonRemove click={itemRemove} /> </div>
                    }
                  
                    {price ? <h3 className='goods_price'>{price} ₽</h3>:''
                    } */}
                      <div className='goods_remove'> <ButtonRemove click={itemRemove} /> </div>
                   
                  
                    <h3 className='goods_price'>{price} ₽</h3>
                    <div className='goods_options'>
                        {
                            Object.keys(options).map((key, i) =>

                                <span key={i + 'opt'}><span>{key}</span>: <span>{options[key].join(', ')}, </span></span>

                            )
                        }
                    </div>
                </div>

            }
        </>
    );
}