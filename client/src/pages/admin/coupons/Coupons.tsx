// components/CouponManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Space, Modal, DatePicker, InputNumber, message } from 'antd';
import axios from 'axios';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';

const CountdownTimer = ({ record, onUpdate }) => {
  const [seconds, setSeconds] = useState(record.countdown * 60);

  useEffect(() => {
    setSeconds(record.countdown * 60); // Initialize the countdown when the record changes

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        onUpdate(record.id, Math.floor((seconds - 1) / 60));

        if (seconds === 1) {
          updateApi(record.id, 0);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onUpdate, record.id, record.countdown]);

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
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => formatCurrency(text),
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
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.id)} style={{ color: 'red' }}>Xóa</a>
        </Space>
      ),
    },
  ];

  const handleCountdownUpdate = (id, newCountdown) => {
    const updatedCoupons = coupons.map((item) =>
      item.id === id ? { ...item, countdown: newCountdown } : item
    );
    setCoupons(updatedCoupons);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa mã Coupon này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        const updatedCoupons = coupons.filter((item) => item.id !== id);
        setCoupons(updatedCoupons);
        message.success('Xóa thành công!');
        try {
          await axios.delete(`http://localhost:3000/Coupons/${id}`);
        } catch (error) {
          console.error('Error deleting data', error);
        }
      },
    });
  };


  const handleAddCoupon = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const id = coupons.length + 1;
      const amount = values.amount || 0;
      const updatedCoupons = [{ ...values, id, amount, countdown: 0 }, ...coupons];
      setCoupons(updatedCoupons);
      setModalVisible(false);
      form.resetFields();

      await axios.post('http://localhost:3000/Coupons', { ...values, id, amount, countdown: 0 });
    } catch (error) {
      console.error('Validation failed', error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Coupons');
        const sortedCoupons = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCoupons(sortedCoupons);
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
          <Form.Item name="amount" label="Số tiền">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponManagement;
