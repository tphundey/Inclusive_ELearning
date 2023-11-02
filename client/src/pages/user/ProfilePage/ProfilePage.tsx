import { useGetUserByIdQuery } from "@/api/user";
import { MailOutlined, UserOutlined, CameraOutlined, EditOutlined, UploadOutlined  } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Button, Dropdown, Modal, Upload, message } from 'antd';
import React, { useState } from 'react';
import './ProfilePage.css'

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

const Profile = () => {
    //Modal
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);


    // Data user
    const { data: userInfo } = useGetUserByIdQuery(1)
    const [fileList, setFileList] = useState([]);

    // Upload Image Banner
    const onUploadChange = (info) => {
        setFileList(info.fileList);
    };

    const customRequest = ({ file, onSuccess, onError }) => {
        // Tại đây, bạn cần xử lý tải lên tệp ảnh và gọi onSuccess khi tải lên thành công
        // hoặc gọi onError nếu có lỗi.
        // Sau đó, cập nhật trạng thái và danh sách tệp ảnh đã tải lên.
    };

    const onRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    const beforeUpload = (file) => {
        // Kiểm tra và hạn chế loại tệp ảnh nếu cần
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Chỉ được tải lên tệp ảnh!');
        }
        return isImage;
    };

    // Layout
    return <>
        <div className="flex space-x-8 h-full bg-gray-200 p-8 pl-20 pr-20" >
            <div>
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="h-[250px] relative">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="h-full rounded-tl-lg rounded-tr-lg" />
                        <div className="absolute bottom-0 right-0 pb-2 pr-2">
                            <Button onClick={() => setModal1Visible(true)} className="custom-button">
                                <p className="text-white pr-2">
                                    <CameraOutlined className="custom-icon" />
                                </p>
                            </Button>
                            <Modal
                                title="Background photo"
                                visible={modal1Visible}
                                key="modal1"
                                onCancel={() => setModal1Visible(false)}
                                footer={[
                                    <Button key="back" onClick={() => setModal1Visible(false)}>
                                        Đóng
                                    </Button>,
                                ]}
                            >
                                <hr className="pb-5" />
                                <div className="image_upload">
                                    <img src="https://png.pngtree.com/png-vector/20200609/ourlarge/pngtree-hand-drawn-computer-learning-online-class-illustration-png-image_2221454.jpg" alt="" />
                                </div>
                                <hr className="pb-5" />
                                <div>
                                    <Upload
                                        customRequest={customRequest}
                                        fileList={fileList}
                                        onChange={onUploadChange}
                                        onRemove={onRemove}
                                        beforeUpload={beforeUpload}
                                        listType="picture"
                                        accept="image/*"
                                    >
                                        <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                                    </Upload>
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col -mt-20 pl-10">
                            <div className="w-40 h-40 z-[1]">
                                <img src={userInfo?.avatarIMG} className="object-cover w-full h-full block border-4 border-white rounded-full" />
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <p className="text-2xl">{userInfo?.username}</p>
                            </div>
                            <p className="text-gray-700">ha noi .
                                <Button onClick={() => setModal2Visible(true)} className="custom-button">
                                    <p className="underline text-blue-500">Contact info</p>
                                </Button>
                                <Modal
                                    title={`${userInfo?.username}`}
                                    visible={modal2Visible}
                                    key="modal2"
                                    onCancel={() => setModal2Visible(false)}
                                    footer={[
                                        <Button key="back" onClick={() => setModal2Visible(false)}>
                                            Đóng
                                        </Button>,
                                    ]}
                                >
                                    <hr className="pb-5" />
                                    <p className="text-black text-xl pb-2">Contact Info</p>
                                    <div className="text-l flex item-center">
                                        <div className="w-10"><UserOutlined /> </div>
                                        <div>
                                            <h5>Your Profile</h5>
                                            <a href="#" className="underline text-blue-500">linkedin.com/in/ngoc-hoàng-thu-233121284</a>
                                        </div>
                                    </div>
                                    <div className="text-l flex item-center">
                                        <div className="w-10"><MailOutlined /> </div>
                                        <div>
                                            <h5>Email</h5>
                                            <a href="#" className="underline text-blue-500">{userInfo?.email}</a>
                                        </div>
                                    </div>
                                </Modal>
                            </p>
                        </div>
                        <div className="icon">
                        <Button onClick={() => setModal3Visible(true)} className="custom-button">
                                <p className="pr-2">
                                    <EditOutlined/>
                                </p>
                            </Button>
                            <Modal
                                title="Update Profile"
                                visible={modal3Visible}
                                key="modal3"
                                onCancel={() => setModal3Visible(false)}
                                footer={[
                                    <Button key="back" onClick={() => setModal3Visible(false)}>
                                        Đóng
                                    </Button>,
                                ]}
                            >
                                <hr className="pb-5" />
                                <p>Form...</p>
                            </Modal>
                        </div>

                    </div>
                    <div className="flex-1 flex flex-col px-8 mt-2">
                        <div className="flex items-center space-x-4 mt-2">
                            <Dropdown menu={{ items }} placement="bottomRight">
                                <Button className=" hover:text-white rounded-lg text-sm space-x-2 transition duration-100 border-blue-700 border">bottomRight</Button>
                            </Dropdown>

                            <button className="flex items-center hover:bg-blue-700 text-blue-500 px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100 border-blue-700 border">
                                <span>Message</span>
                            </button>
                            <button className="flex items-center hover:bg-blue-700 text-gray-500 px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100 border-gray-700 border">
                                <span>More</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">Full name:</span>
                                    <span className="text-gray-700">{userInfo?.username}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Birthday:</span>
                                    <span className="text-gray-700">24 Jul, 1991</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">address:</span>
                                    <span className="text-gray-700">{userInfo?.address}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Mobile:</span>
                                    <span className="text-gray-700">{userInfo?.phone}</span>
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
                            <EditOutlined />
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
                            <EditOutlined />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center h-[100vh]">
                    <div
                        className="relative flex max-w-[500px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none"
                    >
                        <div className="!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
                            <div className="w-full">
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                    <div className="box1 flex">
                                        <div className="logo">
                                            <a href="http://localhost:5173/homepage"> <img src="https://f63-zpg-r.zdn.vn/4940067705430501247/8f148f0e98874fd91696.jpg" alt="logo website" /></a>
                                        </div>
                                        <div className="pt-3 pl-3">Linkend Learning</div>
                                    </div>
                                </h4>
                                <p className="mt-2 text-base text-gray-600">
                                    Add new skills with these courses, free for 24 hours
                                </p>
                            </div>
                            <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <div className="flex items-center">
                                    <div className="">
                                        <img
                                            className="h-[83px] w-[83px] rounded-lg"
                                            src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image1.png?raw=true"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-navy-700 dark:text-white">
                                            Learning PC Maintenance and Performance
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Project #1 .
                                            <a
                                                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                                                href=" "
                                            >
                                                See product details
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                                    <EditOutlined />
                                </div>
                            </div>
                            <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <div className="flex items-center">
                                    <div className="">
                                        <img
                                            className="h-[83px] w-[83px] rounded-lg"
                                            src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image2.png?raw=true"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-navy-700 dark:text-white">
                                            Technology behind the Blockchain
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Project #1 .
                                            <a
                                                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                                                href=" "
                                            >
                                                See product details
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                                    <EditOutlined />
                                </div>
                            </div>
                            <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <div className="flex items-center">
                                    <div className="">
                                        <img
                                            className="h-[83px] w-[83px] rounded-lg"
                                            src="https://github.com/horizon-ui/horizon-tailwind-react-ts-corporate/blob/main/src/assets/img/profile/image3.png?raw=true"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-navy-700 dark:text-white">
                                            Technology behind the Blockchain
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600">
                                            Project #1 .
                                            <a
                                                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                                                href=" "
                                            >
                                                See product details
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                                    <EditOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};
export default Profile