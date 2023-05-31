import './ModalWindow.scss';
import { useEffect, useState } from 'react';


export default function ModalWindow({ children, closed }) {
    
    const [styles,setStyles] =useState({
        marginTop:'initial'
    });
    const [modalClass,setModalClass] = useState('');

    const [move, setMove] = useState(false);



    const setStartTouch = (e) => {
        const y = e.changedTouches[0].clientY;
        if (y > 100) return;
        setMove(y);
    }

    const touchMove = (e) => {

        if (!move) return;
        const elem = e.target.closest('.modal_window');
        if (!elem) return;
        setModalClass('touchMove');
        const y = e.changedTouches[0].clientY + 10 - move;
        if (y < 0) return;
        setStyles({marginTop:y+'px'})

    }


    const touchEnd = (e) => {

        const elem = e.target.closest('.modal_window');
        setModalClass('');
        const moved = window.screen.height / elem.offsetTop;
        console.log(moved);
        if (moved < 7) {
            closed();
            return;
        } else {
            setStyles({marginTop:'initial'});
            setMove(false);
        }

       
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = '';
    }, [])


    return (

        <div className="modal_background" onClick={closed}>
            <div 
            className={'modal_window '+modalClass} 
            style={styles} 
            onClick={(e) => { e.stopPropagation(); }} 
            onTouchStart={setStartTouch} 
            onTouchMove={touchMove}
            onTouchEnd={touchEnd} 
            >
                <div className="modal_close" >
                    <button onClick={closed}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="modal_content" >{children}</div>
            </div>
        </div>



    );
}



// import './ModalWindow.scss';
// import { useEffect, useState } from 'react';


// export default function ModalWindow({ children, closed }) {
//     const [close, setClose] = useState(false);
//     const [move, setMove] = useState(false);

//     const setStartTouch = (e) => {

//         const y = e.changedTouches[0].clientY;
//         if (y > 100) return;
//         setMove(y);
//     }
//     const touchMove = (e) => {
//         if (!move) return;
//         const elem = e.target.closest('.modal_window');
//         if (!elem) return;
//         elem.classList.add('touchMove');
//         const y = e.changedTouches[0].clientY + 10 - move;

//         if (y < 0) return;
//         elem.style.marginTop = y + 'px';


//     }


//     const touchEnd = (e) => {

//         const elem = e.target.closest('.modal_window');
//         elem.classList.remove('touchMove');
//         const moved = window.screen.height / elem.offsetTop;
//         console.log(moved);
//         if (moved < 4) {
//             closed();
//             return;
//         } else {
//             elem.style.marginTop = '';
//             setMove(false);
//         }

       
//     }
//     useEffect(() => {
//         document.body.style.overflow = 'hidden';
//         return () => document.body.style.overflow = '';
//     }, [])


//     return (

//         <div className="modal_background" onClick={closed}>
//             <div className='modal_window' onClick={(e) => { e.stopPropagation(); }} onTouchStart={setStartTouch} onTouchEnd={touchEnd} onTouchMove={touchMove}>
//                 <div className="modal_close" >
//                     <button onClick={closed}>
//                         <span></span>
//                         <span></span>
//                     </button>
//                 </div>
//                 <div className="modal_content" >{children}</div>
//             </div>
//         </div>



//     );
// }