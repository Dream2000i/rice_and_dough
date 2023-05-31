import React, { useState, useRef } from 'react';
import { Alert, Input, Button, Form, Select, DatePicker, Switch, Radio, Space } from 'antd';
import moment from 'moment';




export default function AddPromoCode({
    handleAddCode = f => f,
    dateEternal = false,
    toggleDateEternal = () => !dateEternal,
    setCountCode = f => f,
    form = undefined
}) {

    const [newCodeForm, setNewCodeForm] = useState(false);
    const [value, setValue] = useState(1);


    const newCodeFormVisible = () => {
        setNewCodeForm(prev => !prev);
        // setAddPromoCodeSuccess(false);
    }


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };


    return (
        <>
            <Button
                type="primary"
                style={{
                    marginBottom: 16,
                }}
                onClick={newCodeFormVisible}
            >+ Новый промокод </Button>
            {
                newCodeForm ?
                    <Form {...layout} onFinish={handleAddCode}
                        form={form}
                    >

                        <Form.Item
                            name={['promo_code', 'code']}
                            label="Код"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input maxLength={15} />
                        </Form.Item>
                        <Form.Item
                            name={['promo_code', 'discount']}
                            label="Размер скидки"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input maxLength={5} type="number" />
                        </Form.Item>
                        <Form.Item
                            name={['promo_code', 'value']}
                            label="номинал скидки"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue="%"
                        >
                            <Radio.Group >
                                <Space direction="vertical">
                                    <Radio value={'%'}>%</Radio>
                                    <Radio value={"₽"}>₽</Radio>
                                </Space>
                            </Radio.Group>
                           
                        </Form.Item>



                        <Form.Item
                            name={['promo_code', 'action']}
                            label="Счётчик действия"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={1}
                        >

                            <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
                                <Space direction="vertical">
                                    <Radio value={1}>Разовый</Radio>
                                    <Radio value={9999}>Неограниченный</Radio>
                                    <Radio value={3}>
                                        Указать
                                        {value === 3 ? <Input style={{ width: 100, marginLeft: 10 }} defaultValue={10} onChange={(e) => setCountCode(e.target.value)} /> : null}
                                    </Radio>
                                </Space>
                            </Radio.Group>

                        </Form.Item>
                        {
                            !dateEternal ?
                                <Form.Item
                                    name={['promo_code', 'date']}
                                    label="Дата действия "
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    initialValue={moment('2022-12-31', 'YYYY-MM-DD')}

                                >
                                    <DatePicker />

                                </Form.Item>
                                : <></>
                        }
                        <Form.Item
                            // hidden={true}
                            label="Вечный промокод?"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Switch checked={dateEternal} onChange={toggleDateEternal} />

                        </Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        // onClick={()=> form.resetFields()}
                        >

                            Добавить промокод
                        </Button>
                    </Form>
                    : <></>
            }


        </>
    )
}