import { useEffect, useState, useRef } from 'react';




export default function ContextMenu({ name = '', option = [], current = 0, toggle = (f) => f }) {

    const menu = useRef();
    const [visible, setVisible] = useState(false);

    const toogleVisible = () => setVisible((prev) => !prev);

    const handleOutSideClick = (event) => {
        if (!event.path.includes(menu.current)) setVisible(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleOutSideClick);
        return () => document.removeEventListener('click', handleOutSideClick);
    }, []);




    return (
        <div className={`sort ${(option.filter(item=> item).length < 2)? 'hide':''}`} ref={menu}  onClick={toogleVisible}>
            <span >{name} {option[current]}</span>
            {
                visible &&
                <div className="window" >
                    <ul >
                        {
                            option.map((item, i) => <li className={i == current ? 'active' : ''} key={i} onClick={() => toggle(i)}>{item}</li>)
                        }
                    </ul>
                </div>
            }

        </div>
    );
}