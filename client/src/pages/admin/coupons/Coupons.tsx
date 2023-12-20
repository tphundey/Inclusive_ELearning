// components/CouponManagement.js
import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Space, Modal, DatePicker, InputNumber, message } from 'antd';
import axios from 'axios';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';

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
      const expirationDate = values.expirationDate.format('YYYY-MM-DD');

      // Kiểm tra xem mã coupon mới có trùng với các mã coupon cũ không
      const isDuplicateCode = coupons.some((coupon) => coupon.code === values.code);

      if (isDuplicateCode) {
        message.error('Mã Coupon đã tồn tại. Vui lòng chọn mã khác.');
        return; // Không thêm mới nếu mã trùng
      }

      const updatedCoupons = [
        { ...values, id, amount, expirationDate },
        ...coupons,
      ];
      setCoupons(updatedCoupons);
      setModalVisible(false);
      form.resetFields();

      await axios.post('http://localhost:3000/Coupons', { ...values, id, amount, expirationDate });
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
          <Form.Item name="expirationDate" label="Ngày hết hạn">
            <DatePicker />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng" rules={[{ required: true, message: 'Nhập số lượng!' }]}>
            <InputNumber min={0} max={10} />
          </Form.Item>
          <Form.Item name="amount" label="Số tiền">
            <InputNumber min={0} max={1000000} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponManagement;
