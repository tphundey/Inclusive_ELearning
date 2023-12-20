import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Space, Modal, DatePicker, InputNumber } from 'antd';
import axios from 'axios';

const CountdownTimer = ({ record, onUpdate }) => {
  const [seconds, setSeconds] = useState(record.countdown * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        onUpdate(record.id, Math.floor((seconds - 1) / 60));

        // Nếu countdown đạt đến 0, cập nhật API
        if (seconds === 1) {
          updateApi(record.id, 0);
        }
      }
    }, 1000); // Update every 1 second

    return () => clearInterval(interval);
  }, [seconds, onUpdate, record.id]);

  const updateApi = async (id, newCountdown) => {
    try {
      await axios.put(`http://localhost:3000/Coupons/${id}`, { countdown: newCountdown });
    } catch (error) {
      console.error('Error updating API', error);
    }
  };

  const displayTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return <span>{displayTime()}</span>;
};

const CouponManagement = () => {
  const [form] = Form.useForm();
  const [coupons, setCoupons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      title: 'Mã Coupon',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Countdown (phút)',
      dataIndex: 'countdown',
      key: 'countdown',
      render: (_, record) => {
        return <CountdownTimer record={record} onUpdate={handleCountdownUpdate} />;
      },
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Sửa</a>
          <a onClick={() => handleDelete(record.id)}>Xóa</a>
        </Space>
      ),
    },
  ];

  const handleCountdownUpdate = (id, newCountdown) => {
    // Update countdown value in local state
    const updatedCoupons = coupons.map((item) =>
      item.id === id ? { ...item, countdown: newCountdown } : item
    );
    setCoupons(updatedCoupons);
  };

  const handleDelete = async (id) => {
    // Remove the item from the local state
    const updatedCoupons = coupons.filter((item) => item.id !== id);
    setCoupons(updatedCoupons);

    try {
      // Delete data from the API
      await axios.delete(`http://localhost:3000/Coupons/${id}`);
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handleAddCoupon = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const id = coupons.length + 1; // Assume id is a sequential number
      const updatedCoupons = [...coupons, { ...values, id }];
      setCoupons(updatedCoupons);
      setModalVisible(false);
      form.resetFields();

      // Post data to API
      await axios.post('http://localhost:3000/Coupons', { ...values, id });
    } catch (error) {
      console.error('Validation failed', error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    // Fetch coupon data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Coupons');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={handleAddCoupon}>
        Thêm Coupon
      </Button>

      <Table columns={columns} dataSource={coupons} />

      <Modal
        title="Thêm Coupon"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="code" label="Mã Coupon" rules={[{ required: true, message: 'Nhập mã coupon!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="countdown"
            label="Countdown (phút)"
            rules={[{ required: true, message: 'Nhập số phút countdown!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="expirationDate" label="Ngày hết hạn">
            <DatePicker />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponManagement;
