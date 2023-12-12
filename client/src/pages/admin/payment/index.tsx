import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/api/category";
import { useGetProductsQuery } from "@/api/courses";
import { useGetPaymentsQuery } from "@/api/payment";
import { useGetRolesQuery, useRemoveRoleMutation } from "@/api/role";
import { useGetUsersQuery } from "@/api/user";
import { Icategory } from "@/interfaces/category";
import { Irole } from "@/interfaces/role";
import { Iuser } from "@/interfaces/user";
import { Button, Table, Skeleton, Popconfirm, message, Pagination } from "antd";
import moment from "moment-timezone";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminPayment = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: usersData } = useGetUsersQuery();
    const { data: paymentsData, isLoading: isProductLoading } = useGetPaymentsQuery();
    const { data: courseData } = useGetProductsQuery();
    const dataSource = paymentsData?.map((item: any,index: number) => ({
        key: item.id,
        stt: (index + 1).toString(),
        courseId: item.courseId,
        amount: item.amount,
        userId: item.userId,
        createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
        paymentStatus: item.paymentStatus === true ? ('đã thanh toán') : ('chưa thanh toán')
    }));
    const userMap = new Map(usersData?.map((item: any) => [item.id, item.displayName]));
    const categoryMap = new Map(courseData?.map((item: any) => [item.id, item.courseName])); 
    console.log(dataSource);


    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = dataSource?.slice(startItem, endItem);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "giá tiền",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Trạng thái",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
        },
        {
            title: "tên người dùng",
            dataIndex: "userId",
            key: "userId",
            render: (userId: string) => {
                const displayName = userMap.get(userId);
                return displayName;
            },
        },
        {
            title: "khóa học",
            dataIndex: "courseId",
            key: "courseId",
            render: (courseId: string) => {
                const categoryName = categoryMap.get(courseId);
                return categoryName;
            },
        },
        {
            title: "Thời gian",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        // {
        //     title: "Hành động",
        //     render: ({ key: id }: { key:string }) => (
        //         <div className="flex space-x-2">
        //             <Popconfirm
        //                 placement="top"
        //                 title={"Remove course"}
        //                 description={"Are you sure you want to remove this???"}
        //                 onConfirm={() => confirm(id)}
        //                 okText="Yes"
        //                 cancelText="No"
        //             >
        //                 <Button type="primary" danger>
        //                     xóa
        //                 </Button>
        //             </Popconfirm>
        //             <Button>
        //                 <Link to={`/admin/role/${id}/edit`}>Sửa</Link>
        //             </Button>
        //         </div>
        //     ),
        // },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý Payment</h2>
                
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <>
                    <Table
                        pagination={false}
                        dataSource={currentData}
                        columns={columns}
                    />
                    <Pagination
                        current={currentPage}
                        total={dataSource?.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </>}
        </div>
    );
};

export default AdminPayment;
