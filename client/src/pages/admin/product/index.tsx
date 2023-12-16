import { useState, useEffect } from 'react';
import { Button, Table, Skeleton, Popconfirm, message, Pagination, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';
import { useGetVideosQuery, useRemoveVideoMutation } from "@/api/video";
const AdminProduct = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [productsData, setProductsData] = useState([]);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [, setShowFullDescription] = useState(false);
    const [selectedCourseVideos, setSelectedCourseVideos] = useState([]);
    const [isVideosModalVisible, setIsVideosModalVisible] = useState(false);
    const pageSize = 4;
    const [searchTerm, setSearchTerm] = useState("");
    const showFullDescription = (courseID: any) => {
        const selectedCourse = productsData.find((product: any) => product.id === courseID);

        let isFullDescriptionVisible = true;

        // const toggleDescription = () => {
        //     isFullDescriptionVisible = !isFullDescriptionVisible;
        // };

        const modalContent = (
            <div>
                <p>{isFullDescriptionVisible ? selectedCourse.description : selectedCourse.description.slice(0, 100) + '...'}</p>
                {/* {selectedCourse.description.length > 100 && (
                    <Button type="link" onClick={toggleDescription}>
                        {isFullDescriptionVisible ? 'Rút gọn' : 'Xem thêm'}
                    </Button>
                )} */}
                {/* <ul>
                    {selectedCourseVideos.map((video: any, index: any) => (
                        <li key={index}>
                            <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                                {video.videoTitle}
                            </a>
                        </li>
                    ))}
                </ul> */}
            </div>
        );
        Modal.info({
            title: selectedCourse.courseName,
            content: modalContent,
            onOk() { },
            okButtonProps: {
                style: {
                    backgroundColor: 'green',
                    color: 'white',
                },
            },
        });
    };

    const toggleDescription = (courseID) => {
        setShowFullDescription(showFullDescription === courseID ? null : courseID);
    };

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };
    const fetchData = () => {
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data) => {

                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const filteredData = data.filter((product) =>
                    product.courseName.toLowerCase().includes(lowerCaseSearchTerm)
                );

                setProductsData(filteredData.reverse());
                setIsProductLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu: ', error);
                setIsProductLoading(false);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };
    const showCourseVideos = (courseID: any) => {
        axios.get('http://localhost:3000/videos')
            .then((response) => {
                const allVideos = response.data;
                const videosForCourse = allVideos.filter((video: any) => video.courseId === courseID);
                setSelectedCourseVideos(videosForCourse);
                setIsVideosModalVisible(true);
            })
            .catch((error) => {
                console.error('Error fetching videos: ', error);
            });
    }
    useEffect(() => {
        fetchData();
    }, [searchTerm]);
    const handleResetSearch = () => {
        setSearchTerm("");
    };

    const columns = [
        {
            title: 'ID khóa học',
            dataIndex: 'id',
            key: 'id',
            width: '200px',
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'courseName',
            key: 'name',
            width: '200px',
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'price',
            key: 'price',
            width: '100px',
            render: (price: number) => {
                const formattedPrice = formatCurrency(price);
                return (
                    <>
                        {formattedPrice}
                    </>
                );
            },
        },
        {
            title: ' Chi tiết',
            dataIndex: 'isHidden',
            key: 'isHidden',
            width: 100,
            render: (isHidden: any, record: any) => {
                return (
                    <>
                        <Button className='ml-2' onClick={() => showFullDescription(record.id)}>
                            Mô tả chi tiết
                        </Button>
                    </>
                );
            },
        },

        {
            title: 'Ngày phát hành',
            dataIndex: 'date',
            key: 'date',
            width: '150px',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'courseIMG',
            key: 'courseIMG',
            render: (courseIMG: any) => (
                <img width={100} src={courseIMG} alt="Hình ảnh khóa học" />
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isHidden',
            key: 'isHidden',
            render: (isHidden: any, record: any) => {
                const hiddenButtonClass = isHidden ? 'hidden-button' : '';

                return (
                    <>
                        <Popconfirm
                            title={isHidden ? 'Bỏ ẩn khóa học?' : 'Ẩn khóa học?'}
                            onConfirm={() => updateHiddenState(record.id, !isHidden)}
                        >
                            <Button type={isHidden ? 'dashed' : 'default'} className={hiddenButtonClass}>
                                {isHidden ? 'Đã ẩn' : 'Ẩn'}
                            </Button>
                        </Popconfirm>
                        <Button className='ml-2'>
                            <Link to={`/admin/product/${record.id}/edit`}><i className="fa-solid fa-wrench"></i></Link>
                        </Button>
                        <Button className='ml-2' onClick={() => showCourseVideos(record.id)}>
                            <i className="fa-solid fa-bars"></i>
                        </Button>
                    </>
                );
            },
        },
    ];


    const startItem = (currentPage - 1) * pageSize;
    const endItem = currentPage * pageSize;
    const currentData = productsData.slice(startItem, endItem);

    const updateHiddenState = (productId: any, isHidden: any) => {

        const updatedHiddenState = { isHidden: isHidden };

        axios
            .patch(`http://localhost:3000/Courses/${productId}`, updatedHiddenState)
            .then((response: any) => {

                const updatedProductsData = productsData.map((product: any) => {
                    if (product.id === productId) {
                        return { ...product, isHidden: isHidden };
                    }
                    return product;
                });

                setProductsData(updatedProductsData);
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật trạng thái ẩn/mở khóa học: ', error);
            });
    };

    const handleEditVideo = (videoId: any) => {
        window.open(`http://localhost:5173/admin/video/${videoId}/edit`, '_blank');
    };

    /////////////////////////////////////////////////////////////////



    const [removeCategory, { isLoading: isRemoveLoading }] = useRemoveVideoMutation();
    const [deleteVideoId, setDeleteVideoId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [coursesData, setCoursesData] = useState([]);
    const [coursesData2, setCoursesData2] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const handleCourseIdChange = (event) => {
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
    const fetchVideoDataById = async (videoId) => {
        try {
          const response = await axios.get(`http://localhost:3000/videos/${videoId}`);
          return response.data;
         
          
        } catch (error) {
          console.error('Error fetching video data:', error);
          throw error; // Rethrow the error to handle it at a higher level
        }
      };
 
    
      const handleVideoDelete = async () => {
        if (deleteVideoId) {
            try {
                // Sử dụng giá trị trả về từ fetchVideoDataById
                const videoData = await fetchVideoDataById(deleteVideoId);
                console.log('Video Data from API:', videoData);
    
                const courseIdToDelete = videoData?.courseId;
                const videoDuration = videoData?.duration || 0;
    
                // Lấy thông tin về khóa học từ danh sách coursesData2
                const courseToDelete = coursesData2.find((course) => course.id === courseIdToDelete);
                const initialCourseDuration = courseToDelete?.duration || 0;
    
                console.log("Before deletion:");
                console.log("Initial Course Duration:", initialCourseDuration);
                console.log("Video Duration:", videoDuration);
    
                // Kiểm tra giá trị trả về từ removeCategory
                await removeCategory(deleteVideoId);
    
                // Kiểm tra xem coursesData2 có phải là mảng không trước khi sử dụng map
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
    
                    await Promise.all(updateCoursePromises);
                    messageApi.open({
                        type: "success",
                        content: "Đã xóa thành công!",
                    });
                    setIsVideosModalVisible(false);
                } else {
                    console.error("coursesData2 không phải là một mảng.");
                }
            } catch (error) {
                setIsModalVisible(false);
                console.error("Lỗi khi xóa video hoặc cập nhật khóa học:", error);
            }
        }
    };
    
    return (
        <div>
            <Modal
                title={`Chi tiết khóa học`}
                visible={isVideosModalVisible}
                onOk={() => setIsVideosModalVisible(false)}
                onCancel={() => setIsVideosModalVisible(false)}
                width={700}
                okButtonProps={{
                    style: {
                        backgroundColor: 'green',
                        color: 'white',
                    },
                }}
            >
                <h3 className='text-red-700 font-bold'>Danh sách video của khóa học !</h3>
                <ul>

                    {selectedCourseVideos.map((video: any, index: any) => (
                        <ul key={index} className='flex gap-7 p-5 items-center'>
                            <li>
                                {index + 1}
                            </li>
                            <li style={{ width: 120 }}>
                                <a className='font-bold' href={video.videoURL} target="_blank" rel="noopener noreferrer">
                                    {video.videoTitle}
                                </a>
                            </li>
                            <li>
                                <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                                    <video controls width="300" height="200">
                                        <source src={video.videoURL} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </a>
                            </li>
                            <li >
                                <Button className='bg-blue-800; text-black' type="primary" onClick={() => handleEditVideo(video.id)}>
                                    <i className="fa-solid fa-wrench"></i>
                                </Button>
                                <Modal
                                    title="Xác nhận xóa video"
                                    visible={isModalVisible}
                                    onOk={handleVideoDelete}
                                    onCancel={() => setIsModalVisible(false)}
                                >
                                    Bạn có chắc chắn muốn xóa video này không?
                                </Modal>
                                <Button type="default" onClick={() => {
                                    setSelectedVideoId(video.id);
                                    showDeleteModal(video.id);
                                }}>
                                    <i className="fa-solid fa-trash"></i>
                                </Button>
                            </li>
                        </ul>
                    ))}
                </ul>
            </Modal>
            <header className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Quản lý Khóa Học</h2>
                <Button type="primary" danger>
                    <Link to="/admin/product/add">Thêm khóa học</Link>
                </Button>

            </header>
            {contextHolder}
            <Input.Search
                placeholder="Search by product name"
                onSearch={handleSearch}
                style={{ width: 200, marginBottom: 20 }}
            />
            <Button onClick={handleResetSearch}>Reset Search</Button>

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
                        total={productsData.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default AdminProduct;
