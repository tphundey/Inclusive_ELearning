import  { useState, useEffect } from 'react';
import { Button, Table, Skeleton, Popconfirm, message, Pagination, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';
const AdminProduct = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [productsData, setProductsData] = useState([]);
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedCourseVideos, setSelectedCourseVideos] = useState([]);
    const [isVideosModalVisible, setIsVideosModalVisible] = useState(false);
    const pageSize = 4;


    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    const fetchData = () => {
        fetch('http://localhost:3000/Courses')
            .then((response) => response.json())
            .then((data) => {
                setProductsData(data.reverse());
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
        axios.get('http://localhost:3000/videos')
            .then((response) => {
                const allVideos = response.data;
                const videosForCourse = allVideos.filter((video:any) => video.courseId === courseID);
                setSelectedCourseVideos(videosForCourse);
                setIsVideosModalVisible(true);
            })
            .catch((error) => {
                console.error('Error fetching videos: ', error);
            });
    }
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
                
                const updatedProductsData = productsData.map((product:any) => {
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
                    {selectedCourseVideos.map((video:any, index:any) => (
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
