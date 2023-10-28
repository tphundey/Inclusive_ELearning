import { Button, Layout, Menu, Popover, theme } from "antd";
import { useState } from "react";
import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineUser,
    AiOutlineVideoCamera,
    AiOutlineBook,
    AiOutlineBarChart,
    AiOutlineAlignLeft,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const content = (
        <div>
          <p>info admin</p>
          <p>log-out</p>
        </div>
      )
      const text = <span>Admin</span>
    return (
        <Layout className="h-screen">
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
                            icon: <AiOutlineBarChart  />,
                            label: <Link to="/admin/dashboard">Thống kê</Link>,
                        },
                        {
                            key: "2",
                            icon: <AiOutlineBook  />,
                            label: <Link to="/admin/product">Quản lý khóa học</Link>,
                        },
                        {
                            key: "3",
                            icon: <AiOutlineAlignLeft  />,
                            label: <Link to="/admin/categorys">Quản lý danh mục</Link>,
                        },
                        {
                            key: "4",
                            icon: <AiOutlineVideoCamera  />,
                            label: <Link to="/admin/videos">Quản lý video</Link>,
                        },
                        {
                            key: "5",
                            icon: <AiOutlineUser  />,
                            label: <Link to="/admin/user">Quản lý người dùng</Link>,
                        },
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
                    <div className="relative hidden sm:block">
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
                    </div>

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
                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <p className="ms-2 hidden text-left text-xs sm:block">
                            <strong className="block font-medium">Eric Frusciante</strong>

                            <span className="text-gray-500"> eric@frusciante.com </span>
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
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;