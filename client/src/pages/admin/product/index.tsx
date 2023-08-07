import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { IProduct } from "@/interfaces/product";
import { Button, Table, Skeleton, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
type Props = {};

const AdminProduct = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const { data: productsData, isLoading: isProductLoading } = useGetProductsQuery();
    const [removeProduct, { isLoading: isRemoveLoading }] = useRemoveProductMutation();
    const dataSource = productsData?.map((item: IProduct) => ({
        key: item.id,
        name: item.name,
        price: item.price,
    }));

    const confirm = (id: number | string) => {
        removeProduct(id)
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
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "price",
            key: "price",
        },
        {
            render: ({ key: id }: { key: number | string }) => (
                <div className="flex space-x-2">
                    <Popconfirm
                        placement="top"
                        title={"Xóa sản phẩm"}
                        description={"Mày có chắc cmn chắn muốn xóa không???"}
                        onConfirm={() => confirm(id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                    <Button>
                        <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý sản phẩm</h2>
                <Button type="primary" danger>
                    <Link to="/admin/product/add">Thêm sản phẩm</Link>
                </Button>
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminProduct;
