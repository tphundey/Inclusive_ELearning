import { useGetCategorysQuery, useRemoveCategoryMutation } from "@/api/category";
import { useGetProductsQuery, useRemoveProductMutation } from "@/api/courses";
import { useGetVideosQuery, useRemoveVideoMutation } from "@/api/video";
import { Icategory } from "@/interfaces/category";
import { IProduct } from "@/interfaces/product";
import { Ivideo } from "@/interfaces/video";
import { Button, Table, Skeleton, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
type Props = {};

const AdminVideo = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productsData, isLoading: isProductLoading } = useGetVideosQuery();
    const [removeCategory, { isLoading: isRemoveLoading }] = useRemoveVideoMutation();
    const dataSource = productsData?.map((item: Ivideo) => ({
        key: item.id,
        videoTitle: item.videoTitle,
        videoURL : item.videoURL
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
            title: "id Video",
            dataIndex: "key",
            key: "id",
        },
        {
            title: "Mô tả video",
            dataIndex: "videoTitle",
            key: "videoTitle",
        },
        {
            title: "Link",
            dataIndex: "videoURL",
            key: "videoURL",
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
                        <Link to={`/admin/video/${id}/edit`}>Sửa</Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý Videos</h2>
                <Button type="primary" danger>
                    <Link to="/admin/video/add">Thêm video</Link>
                </Button>
            </header>
            {contextHolder}
            {isProductLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminVideo;
