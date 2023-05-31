import './UI.scss';

export default function ButtonOrange({ children, currentClass ='', click = f => f }) {
    return (
        <button className={`button_orange ${currentClass}`} onClick={click}>{children}</button>
    );
}