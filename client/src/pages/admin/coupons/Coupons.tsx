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
      render: (text, record) => `${record.amount}%`,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text, record) => new Date(record.startDate).toLocaleDateString('en-GB'),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (text, record) => new Date(record.expirationDate).toLocaleDateString('en-GB'),
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
          {isCouponExpiredOrZeroQuantity(record) && (
            <Button className='bg-red-400 text-white' onClick={() => handleDelete(record.id)}>Xóa</Button>
          )}
        </Space>
      ),
    },
  ];

  const isCouponExpiredOrZeroQuantity = (coupon) => {
    const currentDate = new Date();
    const expirationDate = new Date(coupon.expirationDate);

    return expirationDate < currentDate || coupon.quantity === 0;
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
      const amount = values.amount || 0; // Assume amount represents the discount percentage
      const expirationDate = values.expirationDate.format('YYYY-MM-DD');
      const startDate = values.startDate.format('YYYY-MM-DD');
      const createdAt = new Date().toISOString();

      // Kiểm tra xem mã coupon mới có trùng với các mã coupon cũ không
      const isDuplicateCode = coupons.some((coupon) => coupon.code === values.code);

      if (isDuplicateCode) {
        message.error('Mã Coupon đã tồn tại. Vui lòng chọn mã khác.');
        return; // Không thêm mới nếu mã trùng
      }

      // Check if the start date is before the end date
      if (new Date(startDate) > new Date(expirationDate)) {
        message.error('Ngày bắt đầu không được lớn hơn ngày hết hạn.');
        return;
      }

      const updatedCoupons = [
        { ...values, id, amount, expirationDate, startDate, createdAt },
        ...coupons,
      ];
      setCoupons(updatedCoupons);
      setModalVisible(false);
      form.resetFields();
      message.open({
        type: "success",
        content: "Bạn đã thêm mã giảm giá thành công",
      });
      await axios.post('http://localhost:3000/Coupons', { ...values, id, amount, expirationDate, startDate, createdAt });
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
      <Button className='mb-4' type="default" onClick={handleAddCoupon}>
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
            name="expirationDate"
            label="Ngày hết hạn"
            rules={[{ required: true, message: 'Chọn ngày hết hạn!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: 'Chọn ngày bắt đầu!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng" rules={[{ required: true, message: 'Nhập số lượng!' }]}>
            <InputNumber min={0} max={10} />
          </Form.Item>
          <Form.Item name="amount" label="Số tiền">
            <InputNumber min={1} max={70} formatter={value => `${value}%`} parser={value => value.replace('%', '')} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponManagement;
