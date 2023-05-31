import './UI.scss';


export default function Marker({ children = '', active = false, classType = 'one',click=f=>f }) {
    return (
        <li className={active ? 'marker_li active' : 'marker_li'} onClick={click} >
            <span className={`marker ${classType}`}><span></span><span></span></span>

            <span >{children}</span></li>
    );
}