import './MylearningPage.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { Spin } from 'antd';

interface ITabs {
    label: string;
    path: string;
}
const firebaseConfig = {
    apiKey: "AIzaSyB1EWRdSA6tMWHHB-2nHwljjQIGDL_-x_E",
    authDomain: "course23-c0a29.firebaseapp.com",
    projectId: "course23-c0a29",
    storageBucket: "course23-c0a29.appspot.com",
    messagingSenderId: "1090440812389",
    appId: "1:1090440812389:web:e96b86b4d952f89c0d738c",
    measurementId: "G-51L48W6PCB"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);

const MylearningPageLayout = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const tabs: ITabs[] = [
        { label: 'Progress', path: 'progress' },
        { label: 'Saved', path: 'saved' },
        { label: 'Collections', path: 'collections' },
        { label: 'History', path: 'history' }
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Đánh dấu đã kết thúc quá trình loading
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

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
            <div>Bạn cần đang nhập</div>
        );
    }
    return (
        <div className='containerCss'>
            <div className="welcomeback">
                <div className="welcom-logo">
                    {user.photoURL && <img width={80} style={{ borderRadius: 100 }} src={user.photoURL} alt="Ảnh đại diện" />}
                </div>
                <div className="updateinformation">
                    <h2>Welcome back, {user.displayName}!</h2>
                    <a href="">Add experience</a>
                </div>
            </div>

            <div className="mylearningnav">
                <a href="">My Library</a>
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
