import { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

export const ContactUs = () => {
    const form = useRef();

    // Thêm state để lưu trữ giá trị cho các input
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm('service_la6yzel', 'template_604npzp', e.target, 'lFDsvwdsjxYGi8aQ9')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

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

                // Cập nhật giá trị cho các input
                const parsedProfile = JSON.parse(decryptedProfile);
                setName(parsedProfile.name);
                setUserEmail(parsedProfile.email);
                setMessage(parsedProfile.message);
            } else {
                console.log('Ko chạy');
                setIsLoggedIn(false); // Chưa đăng nhập
            }
        }
        start();
    }, []);

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Tên</label>
            <input readOnly type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input readOnly type="email" name="user_email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <label>Url hình ảnh</label>
            <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <input type="submit" value="Send" />
        </form>
    );
};
