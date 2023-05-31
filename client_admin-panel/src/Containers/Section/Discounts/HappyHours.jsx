import { useEffect, useState } from "react"
import { HappyHoursView } from '../../../Components/Pages/index';
import { Form, Modal } from 'antd';

import { backend_happy_hours_get, backend_happy_hours_set } from "../../../backend";
import { get_post } from "../../../function/get_post";

export default function HappyHours() {

    const [form] = Form.useForm();
    const [happyData, setHappyData] = useState({});

    const getHappyData = () => {
        get_post(backend_happy_hours_get)
            .then(data => {
                setHappyData(data);
                form.setFieldsValue(data);
            });
    }

    const sendSetHappyData = (data) => {
        const newData = { ...happyData, ...data };
        get_post(backend_happy_hours_set, 'post', newData)
            .then(data => {
                Modal.success({
                    content: 'Отредактировано!',
                });
            });

    }

    useEffect(getHappyData,

        []);


    return (
        <>
            <HappyHoursView
                form={form}
                submitData={sendSetHappyData}
                resetData={getHappyData}
            />

        </>
    )
}