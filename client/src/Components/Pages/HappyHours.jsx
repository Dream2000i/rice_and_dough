import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const week = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
]

export default function HappyHours({ closed }) {
    const hhours = useSelector(({ settings }) => settings.hhours)||{};
    const [visible, setVisible] = useState(true);

    const onOkHandler = () => {
        setVisible(prev => !prev);
        closed();
    }

    
    return (
        <Modal
            title="Ух ты! Ты как раз во время!"
            visible={visible}
            onOk={onOkHandler}
            cancelButtonProps={{ style: { display: 'none' } }}
            okText="К заказам!"
            className='hhours'
        >
            <p style={{ textAlign: 'center' }}>При заказе в дни {week[hhours.startD]} - {week[hhours.endD]} <br/>с {hhours.startH}:00 до {hhours.endH}:00 скидка {hhours.discount}{hhours.value} на все меню!*</p>
            <br />
            <p style={{ fontSize: '10px', textAlign: 'center' }}>*скидка не распространяется на сеты и комбо! Цены на сайте указаны с учетом скидки!</p>

        </Modal>
    )
};