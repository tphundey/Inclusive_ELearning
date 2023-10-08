import './SignupPage.css';
import { useState, useEffect } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';

const clientId = "617522400337-v8petg67tn301qkocslk6or3j9c4jjmn.apps.googleusercontent.com";

// Hàm mã hóa dữ liệu sử dụng AES-GCM
async function encryptData(data: any, key: any) {
    const textEncoder = new TextEncoder();
    const encodedData = textEncoder.encode(data);

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encodedData
    );

    const encryptedArray = Array.from(new Uint8Array(encryptedData));
    const ivArray = Array.from(iv);
    return { data: encryptedArray, iv: ivArray };
}

// Hàm giải mã dữ liệu sử dụng AES-GCM
async function decryptData(encryptedData: any, iv: any, key: any) {
    const decryptedData = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        key,
        new Uint8Array(encryptedData)
    );

    const textDecoder = new TextDecoder();
    return textDecoder.decode(decryptedData);
}

const SignupPage = () => {
    const [password, setPassword] = useState<any>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [encryptionKey, setEncryptionKey] = useState<any>(null);
    const [profileName, setProfileName] = useState<any>(null);

    const onSuccess = async (res: any) => {
        const profile = {
            email: res.profileObj.email,
            name: res.profileObj.name,
            img: res.profileObj.imageUrl
        };
        const profileJSON = JSON.stringify(profile);

        console.log("Login Success", res.profileObj);

        // Mã hóa thông tin trước khi lưu vào localStorage
        if (encryptionKey) {
            const encryptedData = await encryptData(profileJSON, encryptionKey);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('profile', JSON.stringify(encryptedData));
            console.log('Thông tin đã được mã hóa và lưu vào localStorage.');
        }

        // Kiểm tra email trùng trước khi gửi yêu cầu POST
        axios.get(`http://localhost:3000/googleAccount?email=${res.profileObj.email}`)
            .then((response: any) => {
                if (response.data.length > 0) {
                    console.log('Đã có Email trùng rồi rồi');
                } else {
                    axios.post('http://localhost:3000/googleAccount', profile)
                        .then((response: any) => {
                            console.log('Post thông tin tài khoản thành công !');
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    const onFailure = (res: any) => {
        console.log("Login Fail", res);
        alert('Không thành công');
    }

    useEffect(() => {
        async function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });

            // Tạo hoặc lấy khóa mã hóa từ sessionStorage
            const key = await window.crypto.subtle.generateKey(
                { name: 'AES-GCM', length: 256 },
                true,
                ['encrypt', 'decrypt']
            );
            setEncryptionKey(key);

            // Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
            const encryptedData = localStorage.getItem('profile');
            if (encryptedData && key) {
                const { data, iv } = JSON.parse(encryptedData);
                const decryptedData = await decryptData(data, iv, key);
                const decryptedProfile = JSON.parse(decryptedData);
                console.log('Thông tin đã được giải mã từ localStorage:', decryptedProfile);
                setProfileName(decryptedProfile.name); // Set tên vào state
            }
        }

        gapi.load('client:auth2', start);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                    <form action="">
                        <label className='signup-label' htmlFor="">Email</label>
                        <input type="text" placeholder='Email or Phone' />
                        <label className='signup-label' htmlFor="">Password (6+ characters)
                        </label>
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

                        <button>Agree & Join</button>
                    </form>
                    <div className="signup-or">
                        <div className="sin-hr"></div>
                        <div className="">or</div>
                        <div className="sin-hr"></div>
                    </div>

                    <GoogleLogin
                        clientId={clientId} // Thay thế YOUR_GOOGLE_CLIENT_ID bằng Client ID của bạn
                        buttonText="Đăng nhập bằng Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
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
