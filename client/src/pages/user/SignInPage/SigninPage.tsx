import './SigninPage.css'
import  { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Input, Button, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { sendEmailVerification } from 'firebase/auth';

const SigninPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const sendEmailVerificationCustom = async (user:any, actionCodeSettings:any) => {
        try {
            await sendEmailVerification(user, actionCodeSettings);
        } catch (error:any) {
            console.error('Lỗi gửi xác nhận email:', error.message);
            throw error;
        }
    };

    const handleSignup = async () => {
        try {
            const actionCodeSettings = {
                url: 'http://localhost:5173/confirm-email',
                handleCodeInApp: true,
            };

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerificationCustom(userCredential.user, actionCodeSettings);

            console.log('Đăng ký thành công. Mã xác nhận đã được gửi đến email của bạn.');
            message.success('Đăng ký thành công. Mã xác nhận đã được gửi đến email của bạn.');

        
            setEmailSent(true);
        } catch (error:any) {
            console.error('Lỗi đăng ký:', error.message);
            message.error('Lỗi đăng ký: ' + error.message);
        }
    };
    useEffect(() => {
        if (emailSent) {
            // Bạn có thể thực hiện chuyển hướng tại đây nếu email đã được gửi
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
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Item>



                        <Button type="primary" htmlType="submit">
                            Đăng ký
                        </Button>

                    </Form>
                    <br />
                    <a href="">Forgot password?</a>
                    <div className="login-new">
                        <div>New to LinkedIn?</div>
                        <div><a href="">Join now</a></div>
                        <div>  <a href="">Become an Instructor</a></div>
                    </div>
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
