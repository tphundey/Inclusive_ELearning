import './SigninPage.css'
import { useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Upload, UploadProps, message } from "antd";
import { ILogin, Iuser } from '@/interfaces/user';
import { loginUser, useAddUserMutation } from '@/api/user';
import { useNavigate } from 'react-router';
type FieldType = {
    id?: number,
    username?: string,
    email?: string,
    password?: string,
    avatarIMG?: string,
    address?: string,
    phone?: number,
    roleID?: number
};
const SigninPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [addUser] = useAddUserMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const onFinish = async (values: ILogin) => {
        try {
          let checkLogin = await loginUser(values);
          if (checkLogin) {
            message.success('Đăng nhập thành công!');
            setTimeout(() => {
              navigate('/')
            }, 1000);
          } else {
            throw new Error('Đăng nhập thất bại!');
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    return (
        <div>
            {contextHolder}
            <div className="loginpage">
                <div className="login_bn">
                    <img src="https://f10-zpcloud.zdn.vn/1488129773092553661/6a7b44d847c0929ecbd1.jpg" alt="" />
                </div>
                <div className="login-content">
                    <div className='lg-ct1'>Almost there! Sign in or create an account</div>
                    <div className='lg-ct2'>You can use the same email address and password that you use on LinkedIn.com</div>
                </div>
                <div className='login-input'>
                    {/* <form action="">
                        <input type="text" placeholder='Email or Phone' />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </div>
                        <button>Sign in</button>
                    </form> */}
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder='Email or Phone'/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input 
                            
                                placeholder='Password'
                                type={showPassword ? 'text' : 'password'}
                                
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                        </Form.Item>
                        
                        <button type='submit'>Agree & Join</button>
                       
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
        </div>
    )

};

export default SigninPage;
