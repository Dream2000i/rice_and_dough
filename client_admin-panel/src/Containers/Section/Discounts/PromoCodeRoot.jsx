import { useState, useEffect } from 'react';
import { get_post } from '../../../function/get_post.js';
import { PromoCodeTable, AddPromoCode } from '../../../Components/Pages/index';
import { Modal, Form } from 'antd';
import moment from 'moment';


export default function PromoCodeRoot() {

    const [dataSource, setDataSource] = useState([]);
    const [eternalDate, setEternalDate] = useState(false);
    const [countCode, setCountCode] = useState(false);
    const [form] = Form.useForm();


    const handleAdd = (values) => {


        const date = eternalDate ? '2100-12-31' : moment(values.promo_code.date._d).format('YYYY-MM-DD');
        const action = (values.promo_code.action == 3) ? countCode : values.promo_code.action;


        const newData = {
            ...values.promo_code, date, action
        };

        get_post('admin/promoCode/addPromoCode', 'post', newData)
            .then(data => {
                if (!data) return;
                newData.key = data.key;
                setDataSource([newData, ...dataSource]);
                Modal.success({
                    content: 'Промокод добавлен!',
                });
                form.resetFields();
            });

    };

    const handleDelete = (key) => {

        get_post('admin/promoCode/deletePromoCode', 'post', { id_code: key })
            .then(data => {
                if (!data) return;
                Modal.warning({
                    content: 'Промокод удален!',
                });
                const dataSource2 = [...dataSource];
                setDataSource(
                    dataSource2.filter((item) => item.key !== key),
                );
            });




    };



    useEffect(() => {
        get_post('admin/promoCode/getPromoCode')
            .then(data => data ? setDataSource(data) : '');
    }, []);

    return (
        <div>
            <AddPromoCode
                handleAddCode={handleAdd}
                dateEternal={eternalDate}
                toggleDateEternal={() => setEternalDate(prev => !prev)}
                setCountCode={setCountCode}
                form={form}
            />
            <PromoCodeTable
                dataSource={dataSource}
                handleDeleteString={handleDelete}
            />

        </div>
    )
}