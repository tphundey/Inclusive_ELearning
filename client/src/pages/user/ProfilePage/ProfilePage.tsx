import { useGetUserByIdQuery } from "@/api/user";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Modal } from 'antd';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                <b>Finding a new job</b><br />
                Show recruiters and others <br />that you’re open to work
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                <b>
                    Hiring
                </b><br />
                Share that you’re hiring and <br />attract qualified candidates
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                <b>
                    Hiring
                </b><br />
                Share that you’re hiring and <br />attract qualified candidates
            </a>
        ),
    },
];


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Profile = () => {
    const { id  } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/googleAccount?id=${id}`);
            const data = await response.json();
            setProfileData(data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
    
        if (id) {
          fetchProfileData();
        }
      }, [id]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getUidFromLocalStorage = () => {
        return localStorage.getItem('uid');
    };
    const uid = getUidFromLocalStorage();
    const { data: userInfo } = useGetUserByIdQuery(uid)

    return <>
        <div className="flex space-x-8 h-full bg-gray-200 p-8 pl-20 pr-20" >
            <div>
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="h-[250px] relative">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="h-full rounded-tl-lg rounded-tr-lg" />
                        <div className="absolute bottom-0 right-0 pb-2 pr-2">
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col -mt-20 pl-10">
                        <div className="w-40 h-40 z-[1]">
                            {user?.photoURL && <img src={user?.photoURL} className="object-cover w-full h-full block border-4 border-white rounded-full" />}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-2xl">Họ và Tên: {user?.displayName}</p>
                        </div>
                        <p className="text-gray-700">Email: {user?.email}
                            <span onClick={showModal} className="tran">
                                <a href="#" className="underline text-blue-500">Thông tin liên hệ</a>
                            </span>
                            <Modal title={`${user?.displayName}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <hr className="pb-5" />
                                <p className="text-black text-xl pb-2">Thông tin liên hệ</p>
                                <div className="text-l flex item-center">
                                    <div className="w-10"><UserOutlined /> </div>
                                    <div>
                                        <h5>Trang cá nhân của bạn</h5>
                                        <a href="#" className="underline text-blue-500">{user?.email}</a>
                                    </div>
                                </div>
                                <div className="text-l flex item-center">
                                    <div className="w-10"><MailOutlined /> </div>
                                    <div>
                                        <h5>Email</h5>
                                        <a href="#" className="underline text-blue-500">{user?.email}</a>
                                    </div>
                                </div>
                            </Modal></p>
                    </div>
                    <div className="flex-1 flex flex-col px-8 mt-2">
                        <div className="flex items-center space-x-4 mt-2">
                            <Dropdown menu={{ items }} placement="bottomRight">
                                <Button className=" hover:text-white rounded-lg text-sm space-x-2 transition duration-100 border-blue-700 border">Thông tin khác</Button>
                            </Dropdown>

                            <button className="flex items-center hover:bg-blue-700 text-blue-500 px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100 border-blue-700 border">
                                <span>tin nhắn</span>
                            </button>
                            <button className="flex items-center hover:bg-blue-700 text-gray-500 px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100 border-gray-700 border">
                                <span>Thêm</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Thông tin của bạn</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">Họ và tên: </span>
                                    <span className="text-gray-700">{userInfo?.displayName}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Ngày sinh :</span>
                                    <span className="text-gray-700">24 Jul, 1991</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Địa chỉ: </span>
                                    <span className="text-gray-700">{
                                    userInfo?.address ? (userInfo?.address): ( <> 
                                    <p className="text-red-500">thiếu địa chỉ</p></>)
                                }</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Số điện thoại</span>
                                    <span className="text-gray-700">{userInfo?.phone ? (userInfo?.phone): (<> <p className="text-red-500">thiếu số điện thoại</p></>)}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Email:</span>
                                    <span className="text-gray-700">{userInfo?.email}</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="!z-5 relative flex flex-col rounded-lg bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="border-b border-black border-zinc-300 flex w-full items-center justify-between bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center">

                            <div className="ml-4">
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Profile language
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    English
                                </p>
                            </div>
                        </div>
                        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-3 flex w-full border-zinc-300 items-center justify-between bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center">

                            <div className="ml-4">
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Public profile & URL
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    www.linkedin.com/in/ngoc-hoàng-thu-233121284
                                </p>
                            </div>
                        </div>
                        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};
export default Profile