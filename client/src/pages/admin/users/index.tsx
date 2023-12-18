import { useState, useEffect } from 'react';
import { Button, Table, Skeleton, Popconfirm, message, Pagination } from 'antd';
import axios from 'axios';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const AdminUser = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [messageApi, contextHolder] = message.useMessage();
    const [usersData, setUsersData] = useState([]);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [userEmail, setUserEmail] = useState([]);
    const [pageSize] = useState(5);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
            setUserEmail(currentUser?.email)
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    const fetchData = () => {
        axios
            .get('http://localhost:3000/googleAccount')
            .then((response) => {
                const usersWithRole = response.data.map((user) => {
                    return {
                        ...user,
                        role: user.role || 0, // If 'role' is undefined or null, set it to 0
                    };
                });
                setUsersData(usersWithRole);
                setIsUserLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setIsUserLoading(false);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'displayName',
            key: 'username',
            width: 170
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'photoURL',
            key: 'photoURL',
            render: (photoURL: string) => (
                <img
                    src={photoURL || 'https://i.ytimg.com/vi/rHfyF0HxKTw/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IBooGDAP&rs=AOn4CLCg0XPfUQpq_KYBMAPUbyvKc77rWw'} // Thay 'link_to_default_image' bằng đường dẫn hình mặc định của bạn
                    alt="user avatar"
                    className="user-avatar"
                    width={60}
                />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                return role === 1 ? 'Admin' : 'Người dùng';
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'lock',
            key: 'lock',
            render: (lock: any, record: any) => {
                const hiddenButtonClass = lock ? 'hidden-button' : '';
                const isCurrentUser = userEmail === record.email;

                return (
                    <>
                        {isCurrentUser ? (
                            <span>Không thể chỉnh sửa chính bạn !</span>
                        ) : (
                            <>
                                <Popconfirm
                                    title={lock ? 'Mở ẩn người dùng?' : 'Ẩn người dùng?'}
                                    onConfirm={() => updateUserState(record.id, !lock)}
                                >
                                    <Button className={`${lock ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'} ${hiddenButtonClass}`}>
                                        {lock ? 'Mở khóa' : 'Khóa'}
                                    </Button>
                                </Popconfirm>
                                <Button className='ml-3 bg-success text-white' onClick={() => transferUserRole(record.id, 1)}>Chuyển Admin</Button>
                                <Button className='ml-3 bg-success text-white' onClick={() => transferUserRole1(record.id, 0)}>Chuyển Người dùng</Button>
                            </>
                        )}
                    </>
                );
            },
        },
    ];

    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = usersData.slice(startItem, endItem);
    const transferUserRole = (userId) => {
        const updatedState = { role: 1 }; // Assuming 1 is the role for transferred users

        axios
            .patch(`http://localhost:3000/googleAccount/${userId}`, updatedState)
            .then(() => {
                const updatedUsersData = usersData.map((user) => {
                    if (user.id === userId) {
                        return { ...user, role: 1 };
                    }
                    return user;
                });

                setUsersData(updatedUsersData);
                messageApi.success('Chuyển nhượng thành công');
            })
            .catch((error) => {
                console.error('Lỗi chuyển nhượng người dùng: ', error);
                messageApi.error('Có lỗi xảy ra khi chuyển nhượng');
            });
    };

    const transferUserRole1 = (userId) => {
        const updatedState = { role: 0 }; // Assuming 0 is the role for transferred users

        axios
            .patch(`http://localhost:3000/googleAccount/${userId}`, updatedState)
            .then(() => {
                const updatedUsersData = usersData.map((user) => {
                    if (user.id === userId) {
                        return { ...user, role: 0 }; // Set role to 0 for transferred users
                    }
                    return user;
                });

                setUsersData(updatedUsersData);
                messageApi.success('Chuyển nhượng thành công');
            })
            .catch((error) => {
                console.error('Lỗi chuyển nhượng người dùng: ', error);
                messageApi.error('Có lỗi xảy ra khi chuyển nhượng');
            });
    };

    const updateUserState = (userId: any, lock: any) => {
        console.log(userId, 'eeê');
        const updatedState = { lock: lock };

        axios
            .patch(`http://localhost:3000/googleAccount/${userId}`, updatedState)
            .then(() => {
                const updatedUsersData = usersData.map((user: any) => {
                    if (user.id === userId) {
                        return { ...user, lock: lock };
                    }
                    return user;
                });

                setUsersData(updatedUsersData);
                messageApi.success('Cập nhật trạng thái thành công');
            })
            .catch((error) => {
                console.error('Lỗi cập nhật trạng thái người dùng: ', error);
                messageApi.error('Có lỗi xảy ra khi cập nhật trạng thái');
            });
    };

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý người dùng</h2>
            </header>
            {contextHolder}
            {isUserLoading ? (
                <Skeleton />
            ) : (
                <>
                    <Table pagination={false} dataSource={currentData} columns={columns} />
                    <Pagination current={currentPage} total={usersData.length} pageSize={pageSize} onChange={handlePageChange} />
                </>
            )}
        </div>
    );
};

export default AdminUser;
