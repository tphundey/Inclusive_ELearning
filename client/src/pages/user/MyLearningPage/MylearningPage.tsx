import './MylearningPage.css'
import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

const MylearningPageLayout = () => {
    const tabs = [
        { label: 'Progress', path: 'progress' },
        { label: 'Saved', path: 'saved' },
        { label: 'Collections', path: 'collections' },
        { label: 'History', path: 'history' }
    ];
    const [encryptedData, setEncryptedData] = useState<any>(null);
    const [profileName, setProfileName] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State để kiểm tra đăng nhập

    useEffect(() => {
        async function start() {
            const encryptedProfile: any = localStorage.getItem('profile');
            if (encryptedProfile) {
                const decryptedProfile: any = decodeData(encryptedProfile);
                console.log('Thông tin đã được giải mã từ localStorage:', decryptedProfile);
                setEncryptedData(decryptedProfile);
                setIsLoggedIn(true); // Đã đăng nhập
            } else {
                console.log('Ko chạy');
                setIsLoggedIn(false); // Chưa đăng nhập
            }
        }
        start();
    }, []);

    return (
        <div className='containerCss'>
            <div className="welcomeback">
                {isLoggedIn ? ( // Kiểm tra nếu đã đăng nhập
                    <div className="welcom-logo">
                        {encryptedData && (<img src={JSON.parse(encryptedData).img} alt="" />)}
                    </div>
                ) : (
                    <div className="login-message text-center p-4">
                        <p>Bạn cần đăng nhập trước</p>
                        <br />
                        <a href="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Đăng nhập
                        </a>
                    </div>
                )}
                {isLoggedIn && (
                    <div className="updateinformation">
                        <h2>Welcome back, {JSON.parse(encryptedData).name}!</h2>
                        <a href="">Add experience</a>
                    </div>
                )}
            </div>

            {isLoggedIn && (
                <div className="mylearningnav">
                    <a href=""> My Library</a>
                </div>)}
            {isLoggedIn && (
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
                </div>)}
        </div>
    )

};

export default MylearningPageLayout;
