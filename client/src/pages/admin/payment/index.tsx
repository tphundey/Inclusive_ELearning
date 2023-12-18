import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/api/category";
import { useGetProductsQuery } from "@/api/courses";
import { useGetPaymentsQuery } from "@/api/payment";
import { useGetRolesQuery, useRemoveRoleMutation } from "@/api/role";
import { useGetUsersQuery } from "@/api/user";
import { Icategory } from "@/interfaces/category";
import { Irole } from "@/interfaces/role";
import { Iuser } from "@/interfaces/user";
import { Button, Table, Skeleton, Popconfirm, message, Pagination, DatePicker, Input } from "antd";
import moment from "moment-timezone";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/components/FormatCurency/formatCurency";

const AdminPayment = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: usersData } = useGetUsersQuery();
    const { data: paymentsData, isLoading: isProductLoading } = useGetPaymentsQuery();
    const { data: courseData } = useGetProductsQuery();
    const [searchedUserName, setSearchedUserName] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const dataSource = paymentsData?.map((item: any, index: number) => ({
        key: item.id,
        stt: (index + 1).toString(),
        courseId: item.courseId,
        amount: item.amount,
        userId: item.userId,
        createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
        paymentStatus: item.paymentStatus === true ? ('đã thanh toán') : ('chưa thanh toán')
    }));

    const handleUserNameSearch = (value: string) => {
        setSearchedUserName(value);
    };
    const userMap = new Map(usersData?.map((item: any) => [item.id, item.displayName]));
    const categoryMap = new Map(courseData?.map((item: any) => [item.id, item.courseName]));
    console.log(dataSource);
    const handleDatePickerChange = (date: moment.Moment | null, dateString: string) => {
        setSelectedDate(dateString);
    };
    const filteredData = dataSource?.filter((item) => {
        const userName = userMap.get(item.userId) || "";
        const isMatch = userName.toLowerCase().includes(searchedUserName.toLowerCase());

        if (!isMatch) {
            return false; // Nếu không có ký tự trùng khớp, loại bỏ
        }

        if (selectedDate) {
            const itemDate = moment(item.createdAt, 'DD/MM/YYYY');
            const selectedMoment = moment(selectedDate, 'YYYY-MM-DD');

            if (!itemDate.isSame(selectedMoment, 'day')) {
                return false;
            }
        }
        return true;
    });
    const pageSize = 7;
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
            title: "Giá tiền",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => (
                <span>{formatCurrency(amount)}</span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (paymentStatus: any) => (
                <span className="font-bold" style={{ color: paymentStatus ? "green" : "red" }}>
                    {paymentStatus ? "Thành công" : "Thất bại"}
                </span>
            ),
        },
        {
            title: "Tên người dùng",
            dataIndex: "userId",
            key: "userId",
            render: (userId: string) => {
                const displayName = userMap.get(userId);
                return displayName;
            },
        },
        {
            title: "Khóa học",
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
                <h2 className="text-2xl">Lịch sử thanh toán</h2>
                <div>
                    <DatePicker onChange={handleDatePickerChange} />
                    <Input
                        style={{ width: 250, marginLeft: 10 }}
                        placeholder="Tìm kiếm theo tên người dùng"
                        onChange={(e) => handleUserNameSearch(e.target.value)}
                    />
                </div>
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <>
                <Table
                    pagination={false}
                    dataSource={filteredData}
                    columns={columns}
                />
                <Pagination
                    className="mt-4"
                    current={currentPage}
                    total={filteredData?.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </>}
        </div>
    );
};

export default AdminPayment;
