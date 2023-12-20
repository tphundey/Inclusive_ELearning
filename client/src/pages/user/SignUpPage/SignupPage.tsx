import './SignupPage.css';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, message } from "antd";
import { useNavigate } from 'react-router';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setCookie } from '../../../components/Cookie/cookieUtils';
import Cookies from 'js-cookie';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignupPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

    const roleCookie = Cookies.get('role');

    if (roleCookie) {
        console.log('Role Cookie:', roleCookie);
    } else {
        console.log('Role Cookie not found');
    }
    const handleLogin = async (values: any) => {
        const { email, password } = values;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userRole = '0';
            setCookie('role', userRole);
            message.success('Đăng nhập thành công bạn sẽ được chuyển tới trang chủ');
            setTimeout(() => {
                navigate('/')
            }, 2000);

        } catch (error: any) {
            console.error('Lỗi đăng nhập:', error.message);
            message.error('Lỗi đăng nhập vui lòng kiểm tra lại tài khoản hoặc mật khẩu ' + error.message);
        }
    };

    useEffect(() => {
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
                                userId: firebaseUserId,
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
                           
                            // User exists, check if the account is locked
                            const existingUser = response.data[0];
                            const role = response.data[0].role
                            console.log(role, 'dea');
                            
                            if (existingUser.lock) {
                                console.log('User is locked:', user.email);
                                alert('Không thể đăng nhập. Tài khoản của bạn đã bị khóa.');
                            } else {
                                const userRole = role;
                                setCookie('role', userRole);
                                console.log('User logged in successfully:', user.email);
                                localStorage.setItem('uid', firebaseUserId);
                                console.log('Role Cookie:', roleCookie);
                                 navigate('/');
                            }
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
                    <div className='lg-ct1'>Nâng cao kĩ năng cũng như kiến thức của bạn</div>
                    <div className='lg-ct2'>Bằng cách tham gia với và thỏa thuận của chúng tôi</div>
                </div>
                <div className='login-input'>
                    <Form
                        form={form}
                        name="basic"
                        autoComplete="off"
                        onFinish={handleLogin}
                    >

                        <Form.Item<any>
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                        >
                            <Input placeholder='Email' />
                        </Form.Item>

                        <Form.Item<any>
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input
                                placeholder='Password' type='password'
                            />

                        </Form.Item>

                        <button type='submit'>Đồng ý & Tham gia</button>

                    </Form>
                    <div className="signup-or">
                        <div className="sin-hr"></div>
                        <div className="">Hoặc</div>
                        <div className="sin-hr"></div>
                    </div>

                    <button className="signin_google" onClick={googleSignIn}>
                        <div className="icon"></div>
                        Đăng nhập bằng Google
                    </button>

                    <br />
                    <div className="login-new">
                        <div>Bạn chưa có tài khoản? </div>
                        <div><a href="http://localhost:5173/signin">Đăng ký</a></div>
                    </div>
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
        </div>
    )
};

export default SignupPage;
function fetchUserRole(email: any) {
    throw new Error('Function not implemented.');
}

