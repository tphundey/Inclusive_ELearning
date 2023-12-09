import { useGetUsersQuery } from "@/api/user";
import { Button, Table, Skeleton, Popconfirm, message, Pagination } from "antd";
import axios from "axios";
import { useState } from "react";

const AdminUser = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: usersData, isLoading: isProductLoading } = useGetUsersQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    const updateUserState = (record: any) => {
        const currentLockState = record.locked || false;
        const updatedState = { lock: !currentLockState };
        const updatedUsersData = usersData?.map((user) => {
            if (user.id === record.key) {
                return { ...user, locked: !currentLockState };
            }
            return user;
        });

        setUsersData2(updatedUsersData);

        axios
            .patch(`http://localhost:3000/googleAccount/${record.key}`, updatedState)
            .then(() => {
                messageApi.success('Cập nhật trạng thái thành công');
            })
            .catch((error) => {
                console.error('Lỗi cập nhật trạng thái người dùng: ', error);
                messageApi.error('Có lỗi xảy ra khi cập nhật trạng thái');
            });
    };
    const handleConfirm = (record) => {
        updateUserState(record);
    };

    const dataSource = usersData?.map((item: any) => {
        // const userRole = roleSource?.find(role => role.key === item.roleID);
        return {
            key: item.id,
            username: item.displayName ? (
                <span >{item.displayName}</span>
            ) : (<><p className="text-red-500 ">thiếu thông tin</p></>),
            email: item.email,
            password: item.password,
            avatarIMG: item.photoURL ? (<div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl"><img src={item.photoURL} alt="" /></span>
                </div>
            </div>) : (<p className="text-red-500 ">chưa có ảnh</p>),
            address: item.address ? (
                <span >{item.address}</span>
            ) : (<><p className="text-red-500 ">thiếu thông tin</p></>),
            phone: item.phoneNumber ? (
                <span >{item.phoneNumber}</span>
            ) : (<p className="text-red-500 ">thiếu thông tin</p>),
            // roleID: userRole ? userRole.role : "",
            registeredCourseID: item.registeredCourseID,
            courseSaved: item.courseSaved,
            locked: item.lock || false,
        };
    });

    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = dataSource?.slice(startItem, endItem);
    const [usersData2, setUsersData2] = useState([]);

    const columns = [
        {
            title: "Tên người dùng",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: " Ảnh đại diện",
            dataIndex: "avatarIMG",
            key: "avatarIMG",
            width: "120px"
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: 'Trạng thái',
            dataIndex: 'locked',
            key: 'lock',
            render: (lock, record) => {
                const hiddenButtonClass = lock ? 'hidden-button' : '';

                return (
                    <>
                        <Popconfirm
                            title={lock ? 'Mở ẩn người dùng?' : 'Ẩn người dùng?'}
                            onConfirm={() => handleConfirm(record)}
                        >
                            <Button type={lock ? 'dashed' : 'default'} className={hiddenButtonClass}>
                                {lock ? 'Mở ẩn' : 'Ẩn'}
                            </Button>
                        </Popconfirm>
                        {/* Các nút khác */}
                    </>
                );
            },
        }
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý người dùng</h2>
            </header>
            {contextHolder}
            {/* {isProductLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />} */}
            {isProductLoading ? (
                <Skeleton />
            ) : (
                <>
                    <Table
                        pagination={false}
                        dataSource={currentData}  // Sử dụng currentData thay vì dataSource
                        columns={columns}
                    />
                    <Pagination
                        current={currentPage}
                        total={usersData?.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default AdminUser;
