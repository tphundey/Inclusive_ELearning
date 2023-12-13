import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { applyActionCode, updatePassword } from 'firebase/auth';
import './confirmEmail.css';
import { Input, Button, Form, message } from 'antd';

const ResetPasswordConfirmation: React.FC = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [oobCode, setOobCode] = useState<string | null>(null);
    const location = useLocation();
    const auth = getAuth();
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Trích xuất mã xác nhận từ URL (sử dụng thư viện URLSearchParams)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('oobCode');

        // Nếu có mã xác nhận, bạn có thể thực hiện các bước cần thiết ở đây.
        if (code) {
            // Lưu mã xác nhận vào state
            setOobCode(code);
        }
    }, []);

    const handleUpdatePassword = async () => {
        const auth = getAuth();

        try {
            if (oobCode) {
                // Thực hiện cập nhật mật khẩu
                await confirmPasswordReset(auth, oobCode, newPassword);
                console.log('Cập nhật mật khẩu thành công.');

                // Có thể chuyển hướng người dùng đến trang chính hoặc trang đăng nhập
                navigate('/');
            } else {
                console.error('Không tìm thấy mã xác nhận trong URL.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật mật khẩu:', error.message);
        }
    };
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
            navigate('/signup');
        } catch (error: any) {
            console.error('Lỗi khi gửi dữ liệu:', error.message);
            message.error('Lỗi khi gửi dữ liệu: ' + error.message);
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
            <p>Nhập thông tin người dùng nếu bạn đang đăng ký tài khoản</p>
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
                    <Button className='bg-red-500' type='dashed' htmlType='submit'>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
            <p>Nhập thông tin người dùng nếu bạn đang reset lại mật khẩu</p>
            <label>Nhập mật khẩu mới:</label>
            <input className='border-t-2' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button className='bg-success p-2 rounded-lg' onClick={handleUpdatePassword}>Cập nhật mật khẩu</button>
        </div>
    );
};

export default ResetPasswordConfirmation;
