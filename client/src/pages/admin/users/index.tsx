import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/api/category";
import { useGetRolesQuery } from "@/api/role";
import { useGetUsersQuery, useUpdateUserMutation } from "@/api/user";
import { Icategory } from "@/interfaces/category";
import { Irole } from "@/interfaces/role";
import { Iuser } from "@/interfaces/user";
import { Button, Table, Skeleton, Popconfirm, message, Select, Pagination } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
const { Option } = Select;
const AdminUser = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: usersData, isLoading: isProductLoading } = useGetUsersQuery();
    const [deactivateUser] = useUpdateUserMutation();
    const { data: RolesData } = useGetRolesQuery();
    const roleSource = RolesData?.map((item: Irole) => ({
        key: item.id,
        role: item.role
    }));
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    
    const dataSource = usersData?.map((item: any) => {
        const userRole = roleSource?.find(role => role.key === item.roleID);
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
            phone: item.phoneNumber? (
                <span >{item.phoneNumber}</span>
            ) : (<p className="text-red-500 ">thiếu thông tin</p>),
            roleID: userRole ? userRole.role : "",
            registeredCourseID: item.registeredCourseID,
            courseSaved: item.courseSaved
        };
    });
    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = dataSource?.slice(startItem, endItem);
    console.log(dataSource);

    const confirm = (id: any) => {
        deactivateUser({ id: id, roleID: 1 })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "deactivate successfully!",
                });
            });
    };
    const confirmupgrade = (id: any) => {
        deactivateUser({ id: id, roleID: 2 })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "deactivate successfully!",
                });
            });
    };

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
            title: "Hành động",
            render: ({ key: id, roleID }: { key: number | string; roleID: string }) => (
                <div className="flex space-x-2">
                    {roleID == "Instructor" ? (
                        <Popconfirm
                            placement="top"
                            title={"Remove course"}
                            description={"Are you sure you want to remove this???"}
                            onConfirm={() => confirm(id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger>
                                deactivate
                            </Button>
                        </Popconfirm>
                    ) : (<Popconfirm
                        placement="top"
                        title={"Remove course"}
                        description={"Are you sure you want to remove this???"}
                        onConfirm={() => confirmupgrade(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        
                    </Popconfirm>)}
                    <Button>
                        <Link to={`/admin/user/${id}/edit`}><i className="fa-solid fa-wrench"></i></Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý người dùng</h2>
                {/* <Button type="primary" danger>
                    <Link to="/admin/user/add">Thêm User</Link>
                </Button> */}
            </header>
            {contextHolder}
            {/* {isProductLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />} */}
            {isProductLoading ? (
                <Skeleton />
            ) : (
                <>
                    <Table
                        pagination={false}
                        dataSource={currentData}
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
