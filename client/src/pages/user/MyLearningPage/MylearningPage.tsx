import './MylearningPage.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Spin } from 'antd';
import { Alert, Space } from 'antd';
interface ITabs {
    label: string;
    path: string;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const MylearningPageLayout = () => {
    const userCheck = auth.currentUser;
    const [email, setEmail] = useState<User | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const tabs: ITabs[] = [
        { label: 'Khóa học đang học', path: 'progress' },
        { label: 'Khóa học đã lưu', path: 'saved' },
        { label: 'Lịch sử ', path: 'history' }
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {

            setEmail(currentUser?.email)
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:3000/googleAccount?email=${email}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Lấy thông tin người dùng từ API thất bại.');
                    }
                })
                .then((userDataArray) => {
                    if (userDataArray.length > 0) {
                        const userData = userDataArray[0];
                        setUser(userData);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [email]);

    if (userCheck && userCheck.emailVerified) {
        console.log('Đã được xác thưck');

    } else {
        console.log('Chưa được xác thưck');
    }

    if (loading) {
        return (
            <Spin spinning={loading} tip="Loading...">
                <div className='containerCss' style={{ height: 500 }}>
                </div>
            </Spin>
        );
    }
    if (!user) {
        return (
            <div className='notlogin mt-4 mb-4 text-center'>
                <Space><Alert
                    message="Error"
                    description="Bạn chưa đăng nhập."
                    type="error"
                    showIcon />
                </Space>
                <a className='link text-blue-500 text-sm ' href="/signup">Chuyển hướng đăng nhập</a>
            </div>
        );
    }
    return (
        <div className='containerCss'>
            <div className="welcomeback">
                <div className="welcom-logo">
                    {user.photoURL && <img width={80} style={{ borderRadius: 100 }} src={user.photoURL} alt="Ảnh đại diện" />}
                </div>
                <div className="updateinformation">
                    <h2>Chào mừng quay trở lại, {user.displayName}!</h2>
                    <a href="">Thêm kinh nghiệm</a>
                </div>
            </div>

            <div className="mylearningnav">
                <a href="">Khóa học của tôi</a>
            </div>

            <div className="browsepage">
                <div className="browseleft nav-border">
                    <ul>
                        {tabs.map((tab, index) => (
                            <li key={index} className='mb-5'>
                                <NavLink to={tab.path} >
                                    {tab.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="browseright">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MylearningPageLayout;
