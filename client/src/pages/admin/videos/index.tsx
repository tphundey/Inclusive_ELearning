import { useGetVideosQuery, useRemoveVideoMutation } from "@/api/video";
import { Ivideo } from "@/interfaces/video";
import { Button, Table, Skeleton, message, Pagination } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { useEffect, useState, useCallback } from "react";
type Props = {};

const AdminVideo = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data: productsData, isLoading: isProductLoading } = useGetVideosQuery();
    const [removeCategory, { isLoading: isRemoveLoading }] = useRemoveVideoMutation();
    const [deleteVideoId, setDeleteVideoId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [coursesData, setCoursesData] = useState([]);
    const dataSource = productsData?.map((item: Ivideo, index: number) => ({
        stt : (index + 1).toString(),
        key: item.id,
        videoTitle: item.videoTitle,
        courseName: coursesData[item.courseId] || "Unknown Course", // Look up courseName
        videoURL: item.videoURL,
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = dataSource?.slice(startItem, endItem);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data) => {
                const coursesInfo = {};
                data.forEach((course: any) => {
                    coursesInfo[course.id] = course.courseName;
                });
                setCoursesData(coursesInfo);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    const showDeleteModal = (id: number | string) => {
        setDeleteVideoId(id);
        if (!isModalVisible) {
            setIsModalVisible(true);
        }
    };
    const handleVideoDelete = () => {
        if (deleteVideoId) {
            removeCategory(deleteVideoId)
                .unwrap()
                .then(() => {
                    const updatedCourses = coursesData.map((course: any) => ({
                        ...course,
                        videoID: course.videoID.filter((videoId: any) => videoId !== deleteVideoId),
                    }));


                    const updateCoursePromises = updatedCourses.map((updatedCourse) => {
                        return fetch(`http://localhost:3000/Courses/${updatedCourse.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedCourse),
                        });

                    });
                    setIsModalVisible(false);
                    setDeleteVideoId(null);
                    Promise.all(updateCoursePromises)
                        .then(() => {
                            messageApi.open({
                                type: "success",
                                content: "Deleted successfully!",
                            });
                            setIsModalVisible(false);
                            setDeleteVideoId(null);

                        })
                        .catch((error) => {
                            setIsModalVisible(false);
                            console.error("Error deleting video:", error);
                        });
                });
        }
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "Tiêu đề video",
            dataIndex: "videoTitle",
            key: "videoTitle",
            width: "250px"
        },
        {
            title: "Khóa học",
            dataIndex: "courseName",
            key: "courseName",
            width : "250px"
        },
        {
            title: "Url Video",
            dataIndex: "videoURL",
            key: "videoURL",
        },
        {
            title: "Hành động",
            render: ({ key: id }: { key: number | string }) => (
                <div className="flex space-x-2">
                    <Modal
                        title="Xác nhận xóa video"
                        visible={isModalVisible}
                        onOk={handleVideoDelete}
                        onCancel={() => setIsModalVisible(false)}
                    >
                        Bạn có chắc chắn muốn xóa video này không?
                    </Modal>
                    <Button type="default" onClick={() => showDeleteModal(id)}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>

                    <Button>
                        <Link to={`/admin/video/${id}/edit`}><i className="fa-solid fa-wrench"></i></Link>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý Video</h2>
                <Button type="primary" danger>
                    <Link to="/admin/video/add">Thêm video</Link>
                </Button>
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
                        total={productsData?.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default AdminVideo;
