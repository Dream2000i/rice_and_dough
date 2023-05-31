import './UI.scss';

export default function ButtonRemove({ click = f=>f}) {
    return (
        <div className='button_remove' onClick={click}>
            <span></span>
        </div>
    );
}