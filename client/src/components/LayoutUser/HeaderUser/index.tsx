import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import './HeaderUser.css'
import { Link } from 'react-router-dom';



// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const HeaderUser: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [isListVisible, setListVisible] = useState<boolean>(false);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);


    useEffect(() => {
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data: any[]) => {
                setProducts(data);
                setFilteredProducts(data);
            });
    }, []);

    const handleSearch = () => {
        const firstChar = searchTerm.charAt(0);
        const filtered = products.filter((product) =>
            product.courseName.toLowerCase().startsWith(firstChar.toLowerCase())
        );
        setFilteredProducts(filtered.slice(0, 5));
        setListVisible(true);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        handleSearch();
    };

    const handleClearInput = () => {
        setSearchTerm('');
    };

    const handleItemClick = (product: any) => {
        navigate(`/introduction/${product.id}`);
    };


    return (
        <div className='header-static'>
            <header>
                <div className="containerCss flex-hd">
                    <div className="box1">
                        <div className="logo">
                            <a href="http://localhost:5173/homepage"> <img src="https://f63-zpg-r.zdn.vn/4940067705430501247/8f148f0e98874fd91696.jpg" alt="logo website" /></a>
                        </div>
                    </div>
                    <div className="box2">
                        <div className="left">
                            <a href="http://localhost:5173/browsepage/business"><i className="fa-solid fa-list lups"></i></a>
                            <div className="bolder-css">
                                <form action="">
                                    <input
                                        placeholder='What do you want to learn today?'
                                        type="text"
                                        value={searchTerm}
                                        onInput={handleInputChange}
                                    />
                                    {searchTerm && ( // Hiển thị nút xóa chỉ khi có giá trị trong input
                                        <button onClick={handleClearInput} className="clear-button">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    )}
                                    <button onClick={handleSearch}>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                    {isListVisible && ( // Sử dụng trạng thái để kiểm tra hiển thị danh sách
                                        <div className="search-results">
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((product) => (
                                                    <a href={`/introduction/${product.id}`} key={product.id}>
                                                        <div className='flex search-list'><div> <img className='w-5' src={product.courseIMG} alt="" /></div><div className='search-blue' onClick={() => handleItemClick(product)}>{product.courseName}</div></div>
                                                    </a>
                                                ))
                                            ) : (
                                                <div className="empty-result">Không tìm thấy!</div>
                                            )}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                        <div className="right">
                            <ul>
                                <li style={{ color: 'gray' }}>
                                    <a className='thea' href="http://localhost:5173/homepage">
                                        <i className="fa-solid fa-house lups"></i>
                                        <div>Home</div>
                                    </a>
                                </li>
                                <li style={{ color: 'gray' }}>
                                    <a className='thea' href="http://localhost:5173/mylearning/progress">
                                        <i className="fa-regular fa-file lups"></i>
                                        <div>My learning</div>
                                    </a>
                                </li>
                                <li>
                                    <div className='thea dropdown dropdown-bottom'>
                                        <label tabIndex={0} className="dropdown"><i className="fa-regular fa-user lups tutut"></i>   </label>
                                        <label className="">
                                            <div tabIndex={0}
                                                className="cursor-pointer mt-1 ">
                                                Me <i tabIndex={0} className={'fa-solid fa-caret-down'}></i>
                                            </div></label>
                                        <div className="absolute top-1 left-36">
                                            <div className="dropdown">
                                                <div className="dropdown dropdown-bottom dropdown-end mt-5" onClick={(e) => e.stopPropagation()}>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 right-0 mt-8">
                                                        <div className="flex justify-center items-center">
                                                            <li className="text-center ttf">
                                                                <div className="avatar online">
                                                                    <div className="w-10 rounded-full">
                                                                        {user && user.photoURL ? (
                                                                            <img src={user.photoURL} alt="Ảnh đại diện" />
                                                                        ) : (
                                                                            <img src="https://cdn2.iconfinder.com/data/icons/web-mobile-2-1/64/user_avatar_admin_web_mobile_business_office-512.png" alt="Ảnh mặc định" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </div>
                                                        <li>
                                                            <Link to={`/Profile/${user ? user.uid : ''}`}>
                                                                <Button style={{ width: 160 }}>Profile</Button>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Button>Thảo luận</Button>
                                                        </li>
                                                        <li>
                                                            <Button onClick={() => {
                                                                localStorage.clear();
                                                                auth.signOut()
                                                            }}>Đăng xuất</Button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>

                                <li>
                                    <a className='thea' href="">
                                        <label className="swap swap-rotate">
                                            <input type="checkbox" />
                                            <svg style={{ color: 'gray' }} className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                                            <svg style={{ color: 'gray' }} className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                                        </label>
                                        <div>EN<i className="fa-solid fa-caret-down lups-left"></i></div>
                                    </a>
                                </li>
                            </ul>
                            <div className='freemonth'>
                                <a href="/signup">Start your progress</a>
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