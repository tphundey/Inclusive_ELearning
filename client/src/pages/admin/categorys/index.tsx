import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/api/category";
import { useGetProductsQuery, useRemoveProductMutation } from "@/api/courses";
import { Icategory } from "@/interfaces/category";
import { IProduct } from "@/interfaces/product";
import { Button, Table, Skeleton, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
type Props = {};

const AdminCategory = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productsData, isLoading: isProductLoading } = useGetCategorysQuery();
    const [removeCategory, { isLoading: isRemoveLoading }] = useRemoveCategoryMutation();
    const dataSource = productsData?.map((item: Icategory) => ({
        key: item.id,
        categoryName: item.categoryName,
        categoryDescription : item.categoryDescription
    }));
    console.log(dataSource);
    

    const confirm = (id: number | string) => {
        removeCategory(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Deleted successfully!",
                });
            });
    };
    const columns = [
        {
            title: "id danh mục",
            dataIndex: "key",
            key: "id",
        },
        {
            title: "Tên danh mục",
            dataIndex: "categoryName",
            key: "categoryName",
        },
        {
            title: "mô tả danh mục",
            dataIndex: "categoryDescription",
            key: "categoryDescription",
        },
        {
            title : "actions",
            render: ({ key: id }: { key: number | string }) => (
                <div className="flex space-x-2">
                    <Popconfirm
                        placement="top"
                        title={"Remove course"}
                        description={"Are you sure you want to remove this???"}
                        onConfirm={() => confirm(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                    <Button>
                        <Link to={`/admin/category/${id}/edit`}>Sửa</Link>
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
