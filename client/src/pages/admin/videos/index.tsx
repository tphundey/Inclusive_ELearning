import { useGetVideosQuery, useRemoveVideoMutation } from "@/api/video";
import { Ivideo } from "@/interfaces/video";
import { Button, Table, Skeleton, message, Pagination, Input } from "antd";
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
    const [coursesData2, setCoursesData2] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const handleCourseIdChange = (event:any) => {
        setSelectedCourseId(event.target.value);
    };

    const dataSource = productsData
        ?.filter((item: Ivideo) => selectedCourseId ? item.courseId === selectedCourseId : true)
        .map((item: Ivideo, index: number) => ({
            stt: (index + 1).toString(),
            key: item.id,
            videoTitle: item.videoTitle,
            courseName: coursesData[item.courseId] || "Unknown Course", // Look up courseName
            videoURL: item.videoURL,
        }));
    console.log(coursesData);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
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
    useEffect(() => {
        // Fetch data from 'http://localhost:3000/Courses'
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data) => {
                // Process and update the coursesData state as an array of objects
                const coursesInfo = data.map((course: any) => ({
                    id: course.id,
                    courseName: course.courseName,
                    duration: course.duration
                }));
                setCoursesData2(coursesInfo);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            });
    }, [selectedCourseId]);
    const showDeleteModal = (id: number | string) => {
        setDeleteVideoId(id);
        if (!isModalVisible) {
            setIsModalVisible(true);
        }
    };
    const handleVideoDelete = () => {
        if (deleteVideoId) {
            const videoToDelete = productsData.find((video) => video.id === deleteVideoId);
            const courseIdToDelete = videoToDelete?.courseId;
            const videoDuration = videoToDelete?.duration || 0;

            // Lấy thông tin về khóa học từ danh sách coursesData2
            const courseToDelete = coursesData2.find((course) => course.id === courseIdToDelete);
            const initialCourseDuration = courseToDelete?.duration || 0;

            console.log("Before deletion:");
            console.log("Initial Course Duration:", initialCourseDuration);
            console.log("Video Duration:", videoDuration);

            removeCategory(deleteVideoId)
                .unwrap()
                .then(() => {
                    // Kiểm tra xem coursesData có phải là mảng không trước khi sử dụng map
                    if (Array.isArray(coursesData2)) {
                        const updatedCourses = coursesData2.map((course) => {
                            if (course.id === courseIdToDelete) {
                                // Trừ thời lượng của video bị xóa khỏi thời lượng của khóa học
                                course.duration = Math.max(0, course.duration - videoDuration);
                            }
                            return course;
                        });

                        console.log("After deletion:");
                        console.log("Updated Courses:", updatedCourses);

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
                                    content: "Đã xóa thành công!",
                                });
                            })
                            .catch((error) => {
                                console.error("Lỗi khi cập nhật thời lượng khóa học:", error);
                            });
                    } else {
                        console.error("coursesData không phải là một mảng.");
                    }
                })
                .catch((error) => {
                    setIsModalVisible(false);
                    console.error("Lỗi khi xóa video:", error);
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
            width: "450px"
        },
        {
            title: 'Video',
            dataIndex: 'videoURL',
            key: 'videoURL',
            render: (videoURL:any) => (
              <video controls width="300" height="200">
                <source src={videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ),
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
                <div>
                    <Input style={{ width: 300, marginRight: 20 }} type="text" value={selectedCourseId} onChange={handleCourseIdChange} placeholder="Nhập ID khóa học" />
                    <Button type="primary" danger>
                        <Link to="/admin/video/add">Thêm video</Link>
                    </Button>
                </div>

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
                        style={{ marginBottom: 10 }}
                    />
                    <Pagination
                        current={currentPage}
                        total={dataSource?.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default AdminVideo;
