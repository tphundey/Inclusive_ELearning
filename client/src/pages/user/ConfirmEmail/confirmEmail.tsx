import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { applyActionCode, getAuth } from 'firebase/auth';
import './confirmEmail.css'
import { Input, Button, Form } from 'antd';
const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const oobCode = new URLSearchParams(location.search).get('oobCode');

    const confirmEmail = async () => {
      try {
        await applyActionCode(auth, oobCode!);
        console.log('Xác nhận email thành công.');
      } catch (error: any) {
        console.error('Lỗi xác nhận email:', error.message);
      }
    };

    if (oobCode) {
      confirmEmail();
    } else {
      console.error('Không tìm thấy mã xác nhận trong URL.');
    }
  }, [location, auth]);

  const handleSendData = async () => {
    try {

      const postData = {
        userId: auth.currentUser?.uid,
        displayName: displayName || auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        photoURL: photoURL || auth.currentUser?.photoURL,
        courseSaved: [],
        registeredCourseID: [],
        collectionCourseID: [],
        historyCourseID: []
      };


      await axios.post('http://localhost:3000/googleAccount', postData);
      navigate('/');
    } catch (error: any) {
      console.error('Lỗi khi gửi dữ liệu:', error.message);
    }
  };

  return (
    <div className='confirm-container'>
      <p>Email dã được xác nhận vui lòng nhập các thông tin để hoàn thành quá trình !</p>
      <Form
      name="basic"
      onFinish={handleSendData}
      autoComplete="off"
    >
      <Form.Item
        label="Tên hiển thị"
        name="displayName"
        rules={[
          { required: true, message: 'Vui lòng nhập tên hiển thị!' },
        ]}
      >
        <Input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="URL hình ảnh"
        name="photoURL"
        rules={[
          { required: true, message: 'Vui lòng nhập URL hình ảnh!' },
        ]}
      >
        <Input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default ConfirmEmail;
