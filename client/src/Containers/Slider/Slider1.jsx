import './Slider.scss'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Carousel } from 'antd';

const contentStyle = {
    minHeight: '200px',
    objectFit: 'cover'
};



export default function Slider() {
    const { slider: img } = useSelector(({ settings }) => settings);
   

    return (
        <Carousel autoplay  >
            {/* // <h3 style={contentStyle}>1</h3> */}

            {
                img.map((item, i) => 
                        <div>
                            <Link to={item.url}>
                                <img src={item.img} alt="" style={contentStyle}/>
                            </Link>
                        </div>
                )
            }

        </Carousel>
    );
}

