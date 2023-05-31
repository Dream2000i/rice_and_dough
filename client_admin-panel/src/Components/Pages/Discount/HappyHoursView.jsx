import { useEffect } from 'react';
import { Form, Input, InputNumber,Button, Select, Switch, Radio, Space } from 'antd';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const dayWeek = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
]
export default function HappyHoursView({ form,
    submitData = f => f,
    resetData = f => f
}) {

    const [formRef] = Form.useForm();







    return (
        <Form {...layout} form={form ? form : formRef} name="control-ref" onFinish={submitData}>
            <Form.Item
                name="active"
                label="Включен?"
                rules={[
                    {
                        required: true,
                    },
                ]}
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                name="discount"
                label="Размер скидки"
                rules={[
                    {
                        required: true,
                        type:"number"
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="value"
                label="номинал скидки"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Radio.Group >
                    <Space direction="vertical">
                        <Radio value={'%'}>%</Radio>
                        <Radio value={"₽"}>₽</Radio>
                    </Space>
                </Radio.Group>

            </Form.Item>

            <Form.Item label="Дни акции">
                <Input.Group compact>
                    <Form.Item
                        name="startD"
                        label="C"
                        noStyle
                        rules={[{ required: true }]}
                    >

                        <Select>
                            {
                                dayWeek.map((name, i) => <Option value={i}>{name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Space>  -  </Space>
                    <Form.Item
                        name="endD"
                        noStyle
                        rules={[{ required: true }]}
                    >

                        <Select>
                            {
                                dayWeek.map((name, i) => <Option value={i}>{name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item label="Часы акции">
                <Input.Group compact>
                    <Form.Item
                        name="startH"
                        noStyle
                        rules={[{ required: true }]}
                    >

                        <Select>
                            {
                                Array(24).fill(1).map((e, i) => <Option value={i}>{i}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Space>  -  </Space>
                    <Form.Item
                        name="endH"
                        noStyle
                        rules={[{ required: true }]}
                    >

                        <Select>
                            {
                                Array(24).fill(1).map((e, i) => <Option value={i}>{i}</Option>)
                            }
                        </Select>
                    </Form.Item>
                </Input.Group>
            </Form.Item>


            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Сохарнить
                </Button>
                <Button htmlType="button" onClick={resetData}>
                    Сбросить
                </Button>
            </Form.Item>
        </Form>
    );

}
