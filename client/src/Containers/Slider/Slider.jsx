import './Slider.scss'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";



export default function Slider() {
    const { slider: img } = useSelector(({ settings }) => settings);

    const [currentSlide, setCurrentSlide] = useState(0);
    const prevSlide = currentSlide != 0 ? currentSlide - 1 : img.length - 1;
    const nextSlide = currentSlide != (img.length - 1) ? currentSlide + 1 : 0;
    


    useEffect(() => {
        if (img.length < 2) return;
        const interval = setInterval(() => {
            setCurrentSlide((current) => {
                const res = current === img.length - 1 ? 0 : current + 1;
                return res
            });
        }, 5000)
        return () => clearInterval()
    }, [img]);



    if (img.length == 1) return (
        <div className="slider" >
            <Link to={img[0].url} >
                <img src={img[0].img} alt={img[0].text} className='active' />
            </Link>
        </div>
    )
    if (img.length < 2) return <div></div>

    return (
        <div className="slider" >

            <Link to={img[currentSlide].url} >
                {
                    img.map((item, index) =>


                        <img src={item.img} alt={item.text} className={
                            currentSlide == index ? 'active' : prevSlide == index ? 'prev' : nextSlide == index ? 'next' : 'none'
                        } key={'banner_img_' + index} />
                    )
                }
            </Link>

            <div className="banner_content">
                <div className="container">


                    {img.map((item, index) => <span key={'banner_button_' + index} className={index == currentSlide ? 'active' : ''} onClick={() => { setCurrentSlide(index) }}></span>)}

                </div>
            </div>
        </div>
    );
}

