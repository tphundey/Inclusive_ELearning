import './SignupPage.css'
import { useState, useEffect } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script'
// import axios from "axios";
const clientId = "617522400337-v8petg67tn301qkocslk6or3j9c4jjmn.apps.googleusercontent.com"
const SignupPage = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const onSuccess = (res: any) => {
        // const emailToCheck = "anhnek033@gmail.com";
        const profile = {
            email: res.profileObj.email,
            name: res.profileObj.name,
            img: res.profileObj.imageUrl
        };
        // Chuyển đổi object profile thành chuỗi JSON
        const profileJSON = JSON.stringify(profile);

        console.log("Login Success", res.profileObj);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('profile', profileJSON);


        // Kiểm tra email trùng trước khi gửi yêu cầu POST
        // axios.get(`http://localhost:3000/googleAccount?email=${res.profileObj.email}`)
        //     .then(response => {
        //         if (response.data.length > 0) {
        //             console.log('có tài khoản rồi');
        //         } else {
        //             axios.post('http://localhost:3000/googleAccount', profile)
        //                 .then(response => {
        //                     console.log('Post thông tin tài khoản thành công !');
        //                 })
        //                 .catch(error => {
        //                     console.log(error);
        //                 });
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });


        // if (res.profileObj.email === emailToCheck) {
        //     setTimeout(() => {
        //         console.log('thanh cong');

        //     }, 3000);
        // } else {
        //     setTimeout(() => {
        //         console.log('ko thanh cong');
        //         location.reload();
        //     }, 3000);
        // }
    }

    const onFailure = (res: any) => {
        console.log("Login Fail", res);
        alert('Không thành công')
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start)
    })

    // const responseGoogle = (response) => {
    //     // In thông tin người dùng vào console
    //     console.log('Thông tin người dùng:', response.profileObj);
    // };
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
