import { useGetProductByIdQuery, useGetProductsQuery, useRemoveProductMutation, useRestoreProductMutation, useUpdateProductMutation } from "@/api/courses";
import { IProduct } from "@/interfaces/product";
import { Button, Table, Skeleton, Popconfirm, message, Pagination } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
type Props = {};

const AdminProduct = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productsData, isLoading: isProductLoading } = useGetProductsQuery();
    const [removeProduct, { isLoading: isRemoveLoading }] = useRemoveProductMutation();
    const [restoreProduct] = useRestoreProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const dataSource = productsData?.map((item: IProduct) => ({
        key: item.id,
        name: item.courseName,
        price: item.price,
        desc : item.description,
        date: item.date,
        courseIMG : <img src={item.courseIMG} className="w-full" />,
        categoryID : item.categoryID,
        isDeleted : item.isDeleted
    }));
    
    const handleRestore = (id: any) => {
        updateProduct({id, isDeleted: false})
          .unwrap()
          .then(() => {
            messageApi.open({
              type: "success",
              content: "Khôi phục thành công!",
            });
          });
      };
    const confirm = (id : any) => {
        updateProduct({id, isDeleted: true})
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
            title: "Tên khóa học",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá khóa học",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "mô tả",
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: "thời gian tạo",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "courseIMG ",
            dataIndex: "courseIMG",
            key: "courseIMG",
        },
        {
            title : "actions",
            render: ({ key: id,isDeleted }: { key: number | string; isDeleted :boolean }) => (
                <div className="flex space-x-2">
                {isDeleted==true && ( // Hiển thị button "Khôi phục" chỉ khi khóa học chưa bị xóa
                  <Popconfirm
                    placement="top"
                    title={"Khôi phục khóa học"}
                    description={"Bạn có chắc chắn muốn khôi phục khóa học này không?"}
                    onConfirm={() => handleRestore(id)}
                    okText="Khôi phục"
                    cancelText="Hủy"
                  >
                    <Button type="primary" danger>Khôi phục</Button>
                  </Popconfirm>
                )
                }
                {isDeleted == false && (
                    <>
                    <Popconfirm
                            placement="top"
                            title={"Remove course"}
                            description={"Bạn chắc chắn muốn xóa chứ?"}
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
                  </Button></>
                )}
              </div>
                    // <div className="flex space-x-2">
                    //     <Popconfirm
                    //         placement="top"
                    //         title={"Remove course"}
                    //         description={"Bạn chắc chắn muốn xóa chứ?"}
                    //         onConfirm={() => confirm(id)}
                    //         okText="Yes"
                    //         cancelText="No"
                    //     >
                    //         <Button type="primary" danger>
                    //             Xóa
                    //         </Button>
                    //     </Popconfirm>
                    //     <Button>
                    //         <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
                    //     </Button>
                    // </div> 
                    
            ),
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3; // Số bản ghi hiển thị trên mỗi trang
    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = dataSource?.slice(startItem, endItem);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý Khóa Học</h2>
                <Button type="primary" danger>
                    <Link to="/admin/product/add">Thêm khóa học</Link>
                </Button>
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <><Table 
                                                    pagination={false} 
                                                    dataSource={currentData} 
                                                    columns={columns}
                                                     /><Pagination
                                                     current={currentPage}
                                                     total={dataSource?.length}
                                                     pageSize={pageSize}
                                                     onChange={handlePageChange}
                                                   /> </> }
        </div>
    );
};

export default AdminProduct;
