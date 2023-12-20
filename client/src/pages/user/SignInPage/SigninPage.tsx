import './SigninPage.css'
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Form, Input, Button, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';

const SigninPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const sendEmailVerificationCustom = async (user: any, actionCodeSettings: any) => {
        try {
            await sendEmailVerification(user, actionCodeSettings);
        } catch (error: any) {
            console.error('Lỗi gửi xác nhận email:', error.message);
            throw error;
        }
    };
    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            message.success('Một email khôi phục mật khẩu đã được gửi đến địa chỉ email của bạn.');
        } catch (error) {
            console.error('Lỗi khôi phục mật khẩu:', error.message);
            message.error('Lỗi khôi phục mật khẩu: ' + error.message);
        }
    };

    const handleSignup = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error('Mật khẩu và mật khẩu xác nhận không khớp!');
            }
            const actionCodeSettings = {
                url: 'http://localhost:5173/confirm-email',
                handleCodeInApp: true,
            };

            const userCredential = await createUserWithEmailAndPassword(auth, email, 'temporary-password');
            await sendEmailVerificationCustom(userCredential.user, actionCodeSettings);
            try {
                await signInWithEmailAndPassword(auth, email, 'temporary-password');
            } catch (error) {
                console.error('Lỗi đăng nhập:', error.message);
            }
            console.log('Đăng ký thành công. Mã xác nhận đã được gửi đến email của bạn.');
            message.success('Đăng ký thành công. Mã xác nhận đã được gửi đến email của bạn.');


            setEmailSent(true);
        } catch (error: any) {
            console.error('Lỗi đăng ký:', error.message);
            message.error('Email đăng ký đã được sử dụng! ' + error.message);
        }
    };
    useEffect(() => {
        if (emailSent) {
            navigate('/confirm-loading');
        }
    }, [emailSent]);

    return (
        <div>

            <div className="loginpage">
                <div className="login_bn">
                    <img src="https://f10-zpcloud.zdn.vn/1488129773092553661/6a7b44d847c0929ecbd1.jpg" alt="" />
                </div>
                <div className="login-content">
                    <div className='lg-ct1'>Chào mừng bạn đến với LinkedIn Learning hãy tạo tài khoản hoặc đăng nhập vào dưới đây</div>
                    <div className='lg-ct2'>bạn có thể tạo tài khoản bằng email để có thể sử dụng dịch vụ của chúng tôi</div>
                </div>
                <div className='login-input'>

                    <Form
                        name="basic"
                        onFinish={handleSignup}
                        autoComplete="off"
                    >
                        <Form.Item

                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Item>



                        <Button type="primary" htmlType="submit">
                            Đăng ký
                        </Button>

                    </Form>
                    <br />
                    <a className='cursor-pointer' onClick={handleForgotPassword}>Quên mật khẩu?</a>

                </div>
                <div className='login-footer'>
                    <ul>
                        <li><a href=""><img src="https://f10-zpcloud.zdn.vn/6571297987752003990/8120a900321be745be0a.jpg" alt="" /></a></li>
                        <li><a href="">sự thỏa thuận của người dùng</a></li>
                        <li><a href="">Chính sách bảo mật</a></li>
                        <li><a href="">Hướng dẫn cộng đồng</a></li>
                        <li><a href="">Chính sách cookie</a></li>
                    </ul>
                </div>
            </div>
        </div >
    )

};

export default SigninPage;
