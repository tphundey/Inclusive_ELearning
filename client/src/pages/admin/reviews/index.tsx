
import { useGetProductsQuery } from "@/api/courses";
import { useGetReviewsQuery, useRemoveReviewMutation } from "@/api/review";
import { useGetRolesQuery, useRemoveRoleMutation } from "@/api/role";
import { useGetUsersQuery } from "@/api/user";

import { Button, Table, Skeleton, Popconfirm, message, Pagination, Rate } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminReview = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: reviewData, isLoading: isProductLoading } = useGetReviewsQuery();
    const [removeReview] = useRemoveReviewMutation();
    const { data: usersData } = useGetUsersQuery();
    const { data: courseData } = useGetProductsQuery();
    const dataSource = reviewData?.map((item: any, index: number) => ({
        key: item.id,
        stt: (index + 1).toString(),
        rating: item.rating,
        comment: item.comment,
        userID: item.userID,
        courseID: item.courseID,
        date: item.date
    }));

    const userMap = new Map(usersData?.map((item: any) => [item.id, item.displayName]));
    const categoryMap = new Map(courseData?.map((item: any) => [item.id, item.courseName]));

    // console.log(dataSource);

    const confirm = (id: string) => {
        removeReview(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Xóa thành công!",
                });
            });
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: 'Rate',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: any) => (
                <Rate disabled allowHalf defaultValue={rating} />
            ),
        },
        {
            title: "Nội dung",
            dataIndex: "comment",
            key: "comment",
        },
        {
            title: "Tên người dùng",
            dataIndex: "userID",
            key: "userID",
            render: (userID: string) => {
                const displayName = userMap.get(userID);
                return displayName;
            },
        },
        {
            title: "khóa học",
            dataIndex: "courseID",
            key: "courseID",
            render: (courseID: string) => {
                const categoryName = categoryMap.get(courseID);
                return categoryName;
            },
        },
        {
            title: "Hành động",
            render: ({ key: id }: { key: string }) => (
                <div className="flex space-x-2">
                    <Popconfirm
                        placement="top"
                        title={"Xóa đánh giá"}
                        description={"Bạn có chắc chắn xóa không ?"}
                        onConfirm={() => confirm(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = dataSource?.slice(startItem, endItem);
    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý Đánh giá</h2>
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <>
                <Table
                    pagination={false}
                    dataSource={currentData}
                    columns={columns}
                />
                <Pagination
                    className="mt-4"
                    current={currentPage}
                    total={dataSource?.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </>}
        </div>
    );
};

export default AdminReview;
