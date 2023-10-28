import React, { useState, useEffect } from 'react';
import { Button, Table, Skeleton, Popconfirm, message, Pagination, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminProduct = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [productsData, setProductsData] = useState([]);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedCourseVideos, setSelectedCourseVideos] = useState([]);
    const [isVideosModalVisible, setIsVideosModalVisible] = useState(false);
    const [selectedCourseReviews, setSelectedCourseReviews] = useState([]);
    const [isReviewsModalVisible, setIsReviewsModalVisible] = useState(false);
    const pageSize = 3;


    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    const fetchData = () => {
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data) => {
                setProductsData(data);
                setIsProductLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setIsProductLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showCourseVideos = (courseID: any) => {
        axios.get('http://localhost:3000/Courses')
            .then((response) => {
                const selectedCourse = response.data.find((course) => course.id === courseID);

                if (selectedCourse) {
                    const videoIDs = selectedCourse.videoID;
                    if (videoIDs && videoIDs.length > 0) {
                        axios.get('http://localhost:3000/videos')
                            .then((videoResponse) => {
                                const selectedVideos = videoResponse.data.filter((video) => {
                                    return videoIDs.includes(video.id);
                                });

                                // Gán dữ liệu video vào biến selectedCourseVideos
                                setSelectedCourseVideos(selectedVideos);

                                // Hiển thị modal sau khi đã có dữ liệu
                                setIsVideosModalVisible(true);
                            })
                            .catch((error) => {
                                console.error('Lỗi khi lấy danh sách video: ', error);
                            });
                    }
                }
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách khóa học: ', error);
            });
    };


    const showCourseReviews = (courseID: any) => {
        // Gửi yêu cầu API để lấy danh sách đánh giá dựa trên courseID
        axios.get(`http://localhost:3000/Reviews?courseID=${courseID}`)
            .then((response) => {
                setSelectedCourseReviews(response.data);
                setIsReviewsModalVisible(true);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách đánh giá: ', error);
            });
    };

    const columns = [
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
        },
        {
            title: 'Mô tả khóa học',
            dataIndex: 'description',
            key: 'desc',
            width: '450px',
            render: (description: string) => {
                const shortDescription = showFullDescription
                    ? description
                    : description.length > 100
                        ? `${description.slice(0, 100)}...`
                        : description;

                return (
                    <>
                        <p>{shortDescription}</p>
                        {description.length > 100 && (
                            <Button type="link" onClick={() => setShowFullDescription(!showFullDescription)}>
                                {showFullDescription ? 'Rút gọn' : 'Xem thêm'}
                            </Button>
                        )}
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
                <img src={courseIMG} alt="Hình ảnh khóa học" style={{ width: '100px' }} />
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
                            <Link to={`/admin/product/${record.id}/edit`}>Sửa</Link>
                        </Button>
                        <Button className='ml-2' onClick={() => showCourseVideos(record.id, showCourseReviews(record.id))}>
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
                // Xử lý thành công, cập nhật trạng thái ẩn/mở khóa học ở phía client ngay sau khi nhận phản hồi từ API
                const updatedProductsData = productsData.map((product) => {
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


    return (
        <div>
            <Modal
                title="Chi tiết khóa học"
                visible={isVideosModalVisible}
                onOk={() => setIsVideosModalVisible(false)}
                onCancel={() => setIsVideosModalVisible(false)}
            >
                <ul>
                    {selectedCourseVideos.map((video, index) => (
                        <li key={index}>
                            <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                                {video.videoTitle}
                            </a>
                        </li>
                    ))}
                </ul>
                <br />
                <hr />
                <br />
                <ul>
                    {selectedCourseReviews.map((review) => (
                        <li key={review.id}>
                            <div>Rate: {review.rating} <i class="fa-regular fa-star"></i></div>
                            <div>Bình luận: {review.comment}</div>
                            <div>Ngày: {review.date}</div>
                            <br />
                        </li>

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
