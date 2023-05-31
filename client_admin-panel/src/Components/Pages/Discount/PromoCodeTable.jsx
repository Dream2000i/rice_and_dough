import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Popconfirm, Form, Typography } from 'antd';

import moment from 'moment';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (

    <Form  form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function EditableTable(
  {
    dataSource = [],
    handleDeleteString = f=>f
  }
) {

  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: '30%',
      editable: true,
    },
    {
      title: 'Размер скидки',
      dataIndex: 'discount',

    },
    {
      title: 'Номинал скидки',
      dataIndex: 'value',
    },
    {
      title: 'Счётчик',
      dataIndex: 'action',
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date',
      sorter: (a, b) => moment(a.date) - moment(b.date),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>

        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteString(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  



  // const handleSave = (row) => {
  //   const newData = [...dataSource];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, { ...item, ...row });
  //   setDataSource(newData);
  // };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns2 = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: f=>f,
      }),
    };
  });










  return (

    <>
      <Typography.Title level={2} style={{ textAlign: 'center' }} >Список промокодов</Typography.Title>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns2}
      />
    </>
  );
}


