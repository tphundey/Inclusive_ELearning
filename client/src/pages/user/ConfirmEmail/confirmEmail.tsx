import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { applyActionCode, getAuth, updatePassword } from 'firebase/auth';
import './confirmEmail.css';
import { Input, Button, Form, message } from 'antd';

const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');

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
        historyCourseID: [],
      };

      await axios.post('http://localhost:3000/googleAccount', postData);

      // Update the user's password
      await updatePassword(auth.currentUser, password);

      message.success('Đăng ký và cập nhật mật khẩu thành công.');
      navigate('/');
    } catch (error: any) {
      console.error('Lỗi khi gửi dữ liệu:', error.message);
      message.error('Lỗi khi gửi dữ liệu: ' + error.message);
    }
  };
  const handleUpdatePassword = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        // Cập nhật mật khẩu của người dùng
        await updatePassword(user, password);

        // Cập nhật thông tin khác của người dùng nếu cần
        await updateUserInfo();

        message.success('Cập nhật mật khẩu thành công.');
        navigate('/');
      } else {
        console.error('Không tìm thấy người dùng để cập nhật mật khẩu.');
        message.error('Không tìm thấy người dùng để cập nhật mật khẩu.');
      }
    } catch (error: any) {
      console.error('Lỗi khi cập nhật mật khẩu:', error.message);
      message.error('Lỗi khi cập nhật mật khẩu: ' + error.message);
    }
  };
  const updateUserInfo = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const postData = {
          userId: user.uid,
          displayName: displayName || user.displayName,
          email: user.email,
          photoURL: photoURL || user.photoURL,
          courseSaved: [],
          registeredCourseID: [],
          collectionCourseID: [],
          historyCourseID: [],
        };

        await axios.post('http://localhost:3000/googleAccount', postData);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error.message);
    }
  };


  return (
    <div className='confirm-container'>
      <p>Email đã được xác nhận, vui lòng nhập thông tin để hoàn thành quá trình!</p>
      <Form name='basic' onFinish={handleSendData} autoComplete='off'>
        <Form.Item
          label='Tên hiển thị'
          name='displayName'
          rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
        >
          <Input type='text' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='URL hình ảnh'
          name='photoURL'
          rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
        >
          <Input type='text' value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
        </Form.Item>

        <Form.Item
          className='tet mr-6'
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password width={20} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      <Form name='basic' onFinish={handleUpdatePassword} autoComplete='off'>
            {/* ... (existing code) */}
            <Form.Item
              className='tet mr-6'
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password width={20} value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Cập nhật mật khẩu
              </Button>
            </Form.Item>
          </Form>
    </div>
  );
};

export default ConfirmEmail;
