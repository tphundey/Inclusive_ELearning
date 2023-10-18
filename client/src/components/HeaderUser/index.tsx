import './HeaderUser.css'
import { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
const clientId: any = "617522400337-v8petg67tn301qkocslk6or3j9c4jjmn.apps.googleusercontent.com";

const HeaderUser = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleLogout = () => {
        localStorage.clear();
        console.log('User logged out');
    }
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='header-static'>
            <header>
                <div className="containerCss flex-hd">
                    <div className="box1">
                        <div className="logo">
                            <a href="http://localhost:5173/homepage"> <img src="https://f9-zpcloud.zdn.vn/6063566139068766470/d60a9b137ea1adfff4b0.jpg" alt="logo website" /></a>
                        </div>
                    </div>
                    <div className="box2">
                        <div className="left">
                            <a href="http://localhost:5173/browsepage/business"><i className="fa-solid fa-list lups"></i></a>
                            <div className="bolder-css">
                                <form action="">
                                    <input placeholder='What do you want to learn today?' type="text" />
                                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="right">
                            <ul>
                                <li>
                                    <a className='thea' href="http://localhost:5173/homepage">
                                        <i className="fa-solid fa-house lups"></i>
                                        <div>Home</div>
                                    </a>
                                </li>
                                <li>
                                    <a className='thea' href="http://localhost:5173/mylearning/progress">
                                        <i className="fa-regular fa-file lups"></i>
                                        <div>My learning</div>
                                    </a>
                                </li>
                                <li>

                                    <div className='thea'>
                                        <i className="fa-regular fa-user lups"></i>
                                        <div className="relative">
                                            <div
                                                onClick={toggleDropdown}
                                                className="cursor-pointer"
                                            >
                                                Me <i className={`fa-solid fa-caret-${isDropdownOpen ? 'up' : 'down'} lups-left`}></i>
                                            </div>
                                            {isDropdownOpen && (
                                                <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                    {/* Nội dung của dropdown ở đây */}
                                                    <ul>
                                                        <li>
                                                            <GoogleLogout
                                                                clientId={clientId}
                                                                buttonText="Đăng Xuất" // Văn bản trên nút đăng xuất
                                                                onLogoutSuccess={handleLogout} // Callback khi người dùng đăng xuất thành công
                                                            >
                                                            </GoogleLogout>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a className='thea' href="">
                                        <i className="fa-solid fa-earth-europe lups"></i>
                                        <div>EN<i className="fa-solid fa-caret-down lups-left"></i></div>
                                    </a>
                                </li>

                            </ul>
                            <div className='freemonth'>
                                <a href="">Start my free month</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav>
                <div className="containerCss">
                    <div> Solutions for: </div>
                    <ul>
                        <li><a href="">Business</a></li>
                        <li><a href="">Develop</a></li>
                        <li><a href="">Higher Education</a></li>
                        <li><a href="">| <span className='mr-3'></span> buy for my team</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default HeaderUser