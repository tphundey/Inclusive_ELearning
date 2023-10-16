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

    useEffect(() => {
        async function start() {

            // Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
            const encryptedProfile: any = localStorage.getItem('profile');
            if (encryptedProfile) {
                const decryptedProfile: any = decodeData(encryptedProfile);
                console.log('Thông tin đã được giải mã từ localStorage:', decryptedProfile);
                setEncryptedData(decryptedProfile);
            }
            else {
                console.log('Ko chạy');

            }
        }
        start();
    }, []);

    return (
        <div className='containerCss'>
            <div className="welcomeback">
                <div className="welcom-logo">
                    {encryptedData && (<img src={JSON.parse(encryptedData).img} alt="" />)}
                </div>
                <div className="updateinformation">
                    {encryptedData && (<h2>Welcome back, {JSON.parse(encryptedData).name}!</h2>)}
                    <a href="">Add experience</a>
                </div>
            </div>
            <div className="mylearningnav">
                <a href=""> My Library</a>

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
    )

};

export default MylearningPageLayout;
