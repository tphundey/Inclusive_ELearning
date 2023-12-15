import { useState, useEffect } from 'react';
import { Button, Table, Skeleton, Popconfirm, message, Pagination, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';
const AdminProduct = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [productsData, setProductsData] = useState([]);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [, setShowFullDescription] = useState(false);
    const [selectedCourseVideos, setSelectedCourseVideos] = useState([]);
    const [isVideosModalVisible, setIsVideosModalVisible] = useState(false);
    const pageSize = 4;
    const [searchTerm, setSearchTerm] = useState("");
    const showFullDescription = (courseID: any) => {
        const selectedCourse = productsData.find((product: any) => product.id === courseID);

        let isFullDescriptionVisible = true;

        const toggleDescription = () => {
            isFullDescriptionVisible = !isFullDescriptionVisible;
        };

        const modalContent = (
            <div>
                <p>{isFullDescriptionVisible ? selectedCourse.description : selectedCourse.description.slice(0, 100) + '...'}</p>
                {selectedCourse.description.length > 100 && (
                    <Button type="link" onClick={toggleDescription}>
                        {isFullDescriptionVisible ? 'Rút gọn' : 'Xem thêm'}
                    </Button>
                )}
                <ul>
                    {selectedCourseVideos.map((video: any, index: any) => (
                        <li key={index}>
                            <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                                {video.videoTitle}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );

        Modal.info({
            title: selectedCourse.courseName,
            content: modalContent,
            onOk() { },
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
                // Ghi thông tin phản hồi toàn bộ từ API để gỡ lỗi
                console.log('Phản hồi từ API:', data);

                // Lọc dữ liệu dựa trên từ khóa tìm kiếm
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const filteredData = data.filter((product) =>
                    product.courseName.toLowerCase().includes(lowerCaseSearchTerm)
                );

                // Ghi thông tin về dữ liệu đã được lọc để gỡ lỗi
                console.log('Dữ liệu đã được lọc:', filteredData);

                // Đảm bảo hành vi dự kiến của việc đảo ngược dữ liệu đã được lọc
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
            render: (isHidden: any, record: any) => {
                return (
                    <>
                        <Button className='ml-2' onClick={() => showFullDescription(record.id)}>
                            Chi tiết
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


    return (
        <div>
            <Modal
                title="Chi tiết khóa học"
                visible={isVideosModalVisible}
                onOk={() => setIsVideosModalVisible(false)}
                onCancel={() => setIsVideosModalVisible(false)}
            >
                <ul>
                    {selectedCourseVideos.map((video: any, index: any) => (
                        <li key={index}>
                            <a href={video.videoURL} target="_blank" rel="noopener noreferrer">
                                {video.videoTitle}
                            </a>
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
