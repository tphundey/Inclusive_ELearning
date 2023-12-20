import { Button, Layout, Menu, Popover, message, theme } from "antd";
import { useEffect, useState } from "react";
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineUser,
    AiOutlineVideoCamera,
    AiOutlineBook,
    AiOutlineBarChart,
    AiOutlineAlignLeft,
    AiFillCloseCircle,
    AiOutlineFileText
} from "react-icons/ai";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BankOutlined, CommentOutlined, CreditCardOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const LayoutAdmin = () => {
    const Navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const content = (
        <li>
            <Button style={{ width: 170 }} onClick={() => {
                setTimeout(() => {
                    Navigate("/");
                });

            }}>Thoát</Button>
        </li>
    )
    const text = <>
        <span>Xin chào !</span> <br />
        <span>{user?.displayName}</span>
    </>
    return (

        <Layout style={{ height: 880 }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    className="pt-7"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <AiOutlineBarChart />,
                            label: <Link to="/admin/dashboard">Thống kê</Link>,
                        },
                        {
                            key: "2",
                            icon: <AiOutlineBook />,
                            label: <Link to="/admin/product">Quản lý khóa học</Link>,
                        },
                        {
                            key: "3",
                            icon: <AiOutlineAlignLeft />,
                            label: <Link to="/admin/categorys">Quản lý danh mục</Link>,
                        },
                        {
                            key: "4",
                            icon: <CreditCardOutlined />,
                            label: <Link to="/admin/coupon">Quản lý mã giảm giá</Link>,
                        },
                        {
                            key: "5",
                            icon: <AiOutlineVideoCamera />,
                            label: <Link to="/admin/videos">Quản lý video</Link>,
                        },
                        {
                            key: "6",
                            icon: <AiOutlineUser />,
                            label: <Link to="/admin/users">Quản lý người dùng</Link>,
                        },
                        {
                            key: "7",
                            icon: <AiOutlineFileText />,
                            label: <Link to="/admin/postpage">Quản lý bài viết</Link>,
                        },
                        {
                            key: "8",
                            icon: <CommentOutlined />,
                            label: <Link to="/admin/reviews">Quản lý đánh giá</Link>,
                        },
                        {
                            key: "9",
                            icon: <BankOutlined />,
                            label: <Link to="/admin/payment">Lịch sử thanh toán</Link>,
                        },
                        {
                            key: "10",
                            icon: <AiFillCloseCircle />,
                            label: <Link to="http://localhost:5173/homepage">Thoát</Link>,
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <header className="bg-gray-50 flex items-center justify-between">
                        <div>
                            <Button
                                type="text"
                                icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: "16px",
                                    width: "64px",
                                    height: "64px",
                                }}
                            />
                        </div>
                        <div className="max-w-screen pr-4">
                            <div className="flex items-center sm:justify-between sm:gap-4">
                                {/* <div className="relative hidden sm:block">
                                    <label className="sr-only"> Search </label>

                                    <input
                                        className="h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                                        id="search"
                                        type="search"
                                        placeholder="Search website..."
                                    />

                                    <button
                                        type="button"
                                        className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                                    >
                                        <span className="sr-only">Search</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </div> */}

                                <div
                                    className="flex flex-1 items-center justify-between gap-8 sm:justify-end"
                                >

                                    <button
                                        type="button"
                                        className="group flex shrink-0 items-center rounded-lg transition"
                                    >
                                        <span className="sr-only">Menu</span>
                                        <img
                                            alt="Man"
                                            src={user?.photoURL}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />

                                        <p className="ms-2 hidden text-left text-xs sm:block">
                                            <strong className="block font-medium">{user?.displayName}</strong>

                                            <span className="text-gray-500"> {user?.email} </span>
                                        </p>
                                        <Popover placement='bottomRight' title={text} content={content} trigger='click'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </Popover>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {/* {contextHolder} */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>

    );
};

export default LayoutAdmin;