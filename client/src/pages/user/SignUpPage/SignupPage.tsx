import './SignupPage.css';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, message } from "antd";
import { useNavigate } from 'react-router';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignupPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
            // Handle successful login, navigate to the desired page, etc.
            console.log('Đăng nhập thành công:', userCredential.user);
    
        } catch (error) {
            console.error('Lỗi đăng nhập:', error.message);
            message.error('Lỗi đăng nhập: ' + error.message);
        }
    };
    useEffect(() => {
        // Sử dụng onAuthStateChanged để kiểm tra trạng thái xác thực của người dùng
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            if (currentUser) {
                setUser(currentUser);
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
                const firebaseUserId = user.uid; // Get Firebase user ID
                axios.get(`http://localhost:3000/googleAccount?email=${user.email}`)
                    .then((response) => {

                        if (response.data.length === 0) {
                            axios.post('http://localhost:3000/googleAccount', {
                                userId: firebaseUserId, // Include Firebase user ID in the data
                                displayName: user.displayName,
                                email: user.email,
                                photoURL: user.photoURL,
                                registeredCourseID: [],
                                collectionCourseID: [],
                                historyCourseID: [],
                                courseSaved: [],
                            })
                                .then((response) => {
                                    console.log('User information sent to API:', response.data);
                                    localStorage.setItem('uid', firebaseUserId);
                                    navigate('/')
                                })
                                .catch((error) => {
                                    console.error('Error sending user information to API:', error);
                                    alert('Không thành công');
                                });
                        } else {
                            console.log('Email already exists:', user.email);
                            localStorage.setItem('uid', firebaseUserId);
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
                        <div><a href="http://localhost:5173/signin">Sign in</a></div>
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
