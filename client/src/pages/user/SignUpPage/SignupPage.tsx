import './SignupPage.css';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAddUserMutation } from '@/api/user';
import { Form, Input, message } from "antd";
import { useNavigate } from 'react-router';

const firebaseConfig = {
    apiKey: "AIzaSyB1EWRdSA6tMWHHB-2nHwljjQIGDL_-x_E",
    authDomain: "course23-c0a29.firebaseapp.com",
    projectId: "course23-c0a29",
    storageBucket: "course23-c0a29.appspot.com",
    messagingSenderId: "1090440812389",
    appId: "1:1090440812389:web:e96b86b4d952f89c0d738c",
    measurementId: "G-51L48W6PCB"
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignupPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        // Sử dụng onAuthStateChanged để kiểm tra trạng thái xác thực của người dùng
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            if (currentUser) {
                setUser(currentUser);
                // Người dùng đã đăng nhậpd
                setEmail(currentUser.email)
                console.log(email);

            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    const googleSignIn = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                axios.get(`http://localhost:3000/googleAccount?email=${user.email}`)
                    .then((response) => {
                        if (response.data.length === 0) {
                            axios.post('http://localhost:3000/googleAccount', {
                                displayName: user.displayName,
                                email: user.email,
                                photoURL: user.photoURL,
                            })
                                .then((response) => {
                                    console.log('User information sent to API:', response.data);
                                })
                                .catch((error) => {
                                    console.error('Error sending user information to API:', error);
                                    alert('Không thành công');
                                });
                        } else {
                            console.log('Email already exists:', user.email);
                            navigate('/')
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking email existence:', error);
                        alert('Không thành công');
                    });
            })
            .catch((error) => {
                console.error('Authentication failed:', error);
                alert('Không thành công');
            });
    };

    return (
        <div>

            <div className="loginpage">
                <div className="login_bn">
                    <img src="https://f10-zpcloud.zdn.vn/1488129773092553661/6a7b44d847c0929ecbd1.jpg" alt="" />
                </div>
                <div className="login-content">
                    <div className='lg-ct1'>Make the most of your professional life</div>
                    <div className='lg-ct2'>By clicking Agree & Join, you agree to the LinkedIn User Agreement</div>
                </div>
                <div className='login-input'>
                    <Form
                        form={form}
                        name="basic"
                        autoComplete="off"
                    >
                        <Form.Item<any>
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder='Username' />
                        </Form.Item>
                        <Form.Item<any>
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder='Email or Phone' />
                        </Form.Item>

                        <Form.Item<any>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input
                                placeholder='Password'
                            />

                        </Form.Item>

                        <button type='submit'>Agree & Join</button>

                    </Form>
                    <div className="signup-or">
                        <div className="sin-hr"></div>
                        <div className="">or</div>
                        <div className="sin-hr"></div>
                    </div>

                    <button className="signin_google" onClick={googleSignIn}>
                        <div className="icon"></div>
                        Đăng nhập bằng Google
                    </button>
                    {/* <GoogleLogout>DƯA</GoogleLogout> */}
                    <br />
                    <div className="login-new">
                        <div>Already on LinkedIn? </div>
                        <div><a href="">Sign in</a></div>
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

export default SignupPage;
