import './UI.scss';


export default function Counter({ 
    counter = 0, 
    increment = f => f, 
    decrement = f => f, 
    unit = '' }) {
    return (
        <div className='counter'>
            <span className='minus' onClick={decrement}>
                <span></span>
            </span>
            <span>{counter}{unit}</span>
            <span className='plus' onClick={increment}>
                <span></span>
            </span>
        </div>
    );
}