import './SigninPage.css'
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Input, Button, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';

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

    const handleSignup = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error('Mật khẩu và mật khẩu xác nhận không khớp!');
            }
            const actionCodeSettings = {
                url: 'http://localhost:5173/confirm-email',
                handleCodeInApp: true,
            };

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerificationCustom(userCredential.user, actionCodeSettings);

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
                    <div className='lg-ct1'>Almost there! Sign in or create an account</div>
                    <div className='lg-ct2'>You can use the same email address and password that you use on LinkedIn.com</div>
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

                        <Form.Item
                            className='tet mr-6'
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password width={20} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                          className='tet2 mr-6'
                            label="Password (*)"
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Đăng ký
                        </Button>

                    </Form>
                    <br />
                    <a href="">Forgot password?</a>

                </div>
                <div className='login-footer'>
                    <ul>
                        <li><a href=""><img src="https://f10-zpcloud.zdn.vn/6571297987752003990/8120a900321be745be0a.jpg" alt="" /></a></li>
                        <li><a href="">User Agreement</a></li>
                        <li><a href="">Privacy Policy</a></li>
                        <li><a href="">Community Guidelines</a></li>
                        <li><a href="">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
        </div >
    )

};

export default SigninPage;
