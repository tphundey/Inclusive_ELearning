import './SigninPage.css'
import { useState } from 'react';

const SigninPage = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    <div className='lg-ct1'>Almost there! Sign in or create an account</div>
                    <div className='lg-ct2'>You can use the same email address and password that you use on LinkedIn.com</div>
                </div>
                <div className='login-input'>
                    <form action="">
                        <input type="text" placeholder='Email or Phone' />
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
                        <button>Sign in</button>
                    </form> <br />
                    <a href="">Forgot password?</a>
                    <div className="login-new">
                        <div>New to LinkedIn?</div>
                        <div><a href="">Join now</a></div>
                        <div>  <a href="">Become an Instructor</a></div>
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

export default SigninPage;
