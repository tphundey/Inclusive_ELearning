import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import './test.css'
import emailjs from '@emailjs/browser';
import { useParams } from 'react-router-dom';
// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

const Certificate = () => {
    const form = useRef();
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const contentRef = useRef(null);
    const [encryptedData, setEncryptedData] = useState<any>(null);
    const [profileName, setProfileName] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State để kiểm tra đăng nhập
    const [courseData, setCourseData] = useState(null);
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

    useEffect(() => {
        // Sử dụng `id` để tạo URL yêu cầu
        const apiUrl = `http://localhost:3000/Courses/${id}`;

        // Gửi yêu cầu HTTP để lấy dữ liệu khóa học
        axios.get(apiUrl)
            .then((response) => {
                const course = response.data;
                setCourseData(course);
                console.log(course);
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
            });
    }, [id]); // Khi `id` thay đổi, useEffect sẽ chạy lại

    const generateCertificate = () => {
        const content = contentRef.current;
        html2canvas(content)
            .then(canvas => {
                const image = canvas.toDataURL('image/png');
                // Bây giờ bạn có thể sử dụng hình ảnh để hiển thị hoặc lưu trữ
                console.log(image);
                // Nếu bạn muốn hiển thị hình ảnh trên trang web
                const certificateImage = new Image();
                certificateImage.src = image;
                document.body.appendChild(certificateImage);
            });
    };
    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm('service_la6yzel', 'template_604npzp', e.target, 'lFDsvwdsjxYGi8aQ9')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

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
    // Kiểm tra xem dữ liệu đã tải thành công
    if (courseData === null) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div style={{ display: 'flex', gap:'10px' }}>
                <button style={{
                    backgroundColor: '#476A69',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }} onClick={generateCertificate}>Tạo chứng chỉ</button>
                <form ref={form} onSubmit={sendEmail}>
                    <input className='hudk' readOnly type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className='hudk' readOnly type="email" name="user_email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <input
                        className="bt-hu"
                        type="submit"
                        value="Gửi thông tin tới Email"
                        style={{
                            backgroundColor: '#476A69',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                    />
                </form>
            </div>

            <div ref={contentRef}>
                <div className="certificate">
                    <div className='cer-top'>
                        <img src="https://f11-zpcloud.zdn.vn/877077799436060275/184c5f703c91ebcfb280.jpg" alt="" />
                        <img className='cer-top-1' src="https://f11-zpcloud.zdn.vn/6738613259714560878/42cb06f76516b248eb07.jpg" alt="" />
                    </div>
                    <div className="hr-cer"></div>
                    <div className='t22'>
                        <p>Certificate of Completion</p>
                    </div>
                    <p className='t33'> This is to acknowledge that</p>
                    <p className="name"><u>{JSON.parse(encryptedData).name}</u></p>
                    <p className="t44">has completed</p>
                    <p className="course">A Training Course on: <b><u>  {courseData.courseName}  </u></b></p>
                </div>
            </div>
        </div>
    );
}

export default Certificate;