import { useEffect } from 'react';
import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/api/category";
import { Icategory } from "@/interfaces/category";
import { Button, Table, Skeleton, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import axios from 'axios';
const AdminCategory = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productsData, isLoading: isProductLoading } = useGetCategorysQuery();
    const [removeCategory, { isLoading: isRemoveLoading }] = useRemoveCategoryMutation();

    const dataSource = productsData?.map((item: Icategory, index: number) => ({
        stt : (index + 1).toString(),
        key: item.id,
        categoryName: item.categoryName,
        categoryDescription: item.categoryDescription
    }));

    const checkCoursesInCategory = async (categoryId: string) => {
        try {
            // Lấy danh sách khóa học từ API
            const response = await axios.get('http://localhost:3000/Courses');
            const courses = response.data;

            // Kiểm tra xem có khóa học nào có categoryId trùng với id của category đang định xóa hay không
            const coursesInCategory = courses.filter((course: any) => course.categoryID === categoryId);
            console.log(coursesInCategory);

            if (coursesInCategory.length > 0) {
                // Có khóa học trong danh mục, hiển thị cảnh báo và return false
                messageApi.open({
                    type: "warning",
                    content: "Danh mục này có khóa học. Vui lòng xóa khóa học trước khi xóa danh mục.",
                });
                return false;
            }

            // Không có khóa học trong danh mục, return true
            return true;
        } catch (error) {
            console.error("Error checking courses in category:", error);
            return false; // Xử lý lỗi và không xóa danh mục
        }
    };

    const confirm = (id: string) => {
 
        checkCoursesInCategory(id).then((canRemove) => {
            if (canRemove) {
                removeCategory(id)
                    .unwrap()
                    .then(() => {
                        messageApi.open({
                            type: "success",
                            content: "Deleted successfully!",
                        });
                    });
            }
        });
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "Tên danh mục",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "Hành động",
            render: ({ key: id }: { key: string }) => (
                <div className="flex space-x-2">
                    <Popconfirm
                        placement="top"
                        title={"Xóa danh mục"}
                        description={"Bạn có chắc chắn xóa danh mục này không ?"}
                        onConfirm={() => confirm(id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" danger>
                            <i className="fa-solid fa-trash"></i>
                        </Button>
                    </Popconfirm>
                    <Button>
                        <Link to={`/admin/category/${id}/edit`}><i className="fa-solid fa-wrench"></i></Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý danh mục</h2>
                <Button type="primary" danger>
                    <Link to="/admin/category/add">Thêm danh mục</Link>
                </Button>
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminCategory;
