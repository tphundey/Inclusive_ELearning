import { useGetPostpagesQuery, useRemovePostpageMutation } from "@/api/postpage";
import { Button, Table, Skeleton, Popconfirm, message, Select, Pagination } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
const { Option } = Select;
const AdminPostpage = (props: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [showcontent, setshowcontent] = useState(false);
    const { data: PostpageData, isLoading: isProductLoading } = useGetPostpagesQuery();
    const [removePostpage] = useRemovePostpageMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    const confirm = (id: number | string) => {
        removePostpage(id)
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Deleted successfully!",
                });
            });
    };
    const dataSource = PostpageData?.map((item: any) => {
        return {
            key: item.id,
            title: item.title ? (
                <span >{item.title}</span>
            ) : (<><p className="text-red-500 ">thiếu thông tin</p></>),
            content: item.content,
            author: item.author,
            // photoURL: item.photoURL ? (<div className="avatar placeholder">
            //     <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
            //         <span className="text-3xl"><img src={item.photoURL} alt="" /></span>
            //     </div>
            // </div>) : (<p className="text-red-500 ">chưa có ảnh</p>),
            date: item.date,
            likes : item.likes,
            coment: item.coments,
            image : item.image ? (
                <img src={item.image} className="w-[120px] h-[120px] object-cover" />
            ): (
                <p className="text-red-500 ">chưa có ảnh</p>
            )

        };
    });
    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = dataSource?.slice(startItem, endItem);
    console.log(dataSource);

    const columns = [
        {
            title: "Tên người dùng",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            
        },
        // {
        //     title: "Hình ảnh",
        //     dataIndex: "photoURL",
        //     key: "photoURL",
        //     with: "120px"
        // },
        {
            title: "ngày đăng",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Lượt thích",
            dataIndex: "likes",
            key: "likes",
        },
        {
            title: "ảnh bài đăng",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Hành động",
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
                            xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý bài viết</h2>
                <Button type="primary" danger >
                    <a href={`/admin/post/add`}>Thêm bài viết</a>
                </Button>
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
                        total={PostpageData?.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default AdminPostpage;
