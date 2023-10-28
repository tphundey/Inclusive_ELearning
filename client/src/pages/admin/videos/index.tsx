import { useGetVideosQuery, useRemoveVideoMutation } from "@/api/video";
import { Ivideo } from "@/interfaces/video";
import { Button, Table, Skeleton, Popconfirm, message } from "antd";
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
    const dataSource = productsData?.map((item: Ivideo) => ({
        key: item.id,
        videoTitle: item.videoTitle,
        courseName: coursesData[item.courseId] || "Unknown Course", // Look up courseName
        videoURL: item.videoURL,
    }));
    console.log(dataSource);
   

    useEffect(() => {
        // Lấy thông tin khóa học từ API "http://localhost:3000/Courses"
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data) => {
                const coursesInfo = {};
                data.forEach((course) => {
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
        setIsModalVisible(true); 
    };
    const handleVideoDelete = () => {
        if (deleteVideoId) {
            removeCategory(deleteVideoId)
                .unwrap()
                .then(() => {
                    const updatedCourses = coursesData.map((course) => ({
                        ...course,
                        videoID: course.videoID.filter((videoId) => videoId !== deleteVideoId),
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

                    Promise.all(updateCoursePromises)
                        .then(() => {
                            messageApi.open({
                                type: "success",
                                content: "Deleted successfully!",
                            });
                            setDeleteVideoId(null);
                            setIsModalVisible(false);
                        })
                        .catch((error) => {
                            console.error("Error updating courses:", error);
                        });
                });
        }
    };
 
    const columns = [
        {
            title: "id",
            dataIndex: "key",
            key: "id",
        },
        {
            title: "Tiêu đề video",
            dataIndex: "videoTitle",
            key: "videoTitle",
            width:"250px"
        },
        {
            title: "Khóa học",
            dataIndex: "courseName",
            key: "courseName",
        },
        {
            title: "Url Video",
            dataIndex: "videoURL",
            key: "videoURL",
        },
        {
            title: "actions",
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
            {isProductLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminVideo;
