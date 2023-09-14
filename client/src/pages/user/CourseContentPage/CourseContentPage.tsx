import './ContentPage.css'
import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const CourseContentPage = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:1337/api/courses/${id}`)
            .then((response) => {
                // Lưu thông tin sản phẩm vào state
                console.log(response.data);
                const productData = response.data.data.attributes;
                setProduct(productData);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    useEffect(() => {
        // Gọi API để lấy thông tin sản phẩm dựa trên 'id' từ URL
        axios
            .get(`http://localhost:1337/api/courses/${id}`)
            .then((response) => {
                const productData = response.data.data.attributes;
                setProduct(productData);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });

        axios
            .get('http://localhost:1337/api/videos')
            .then((response) => {
                const videoData = response.data.data; // Lấy mảng video từ response.data.data
                if (Array.isArray(videoData)) {
                    setVideos(videoData);
                    const filteredVideoData = videoData.filter((videoItem) => videoItem.attributes.courseId === id);
                    setFilteredVideos(filteredVideoData);
                    console.log(filteredVideoData);
                } else {
                    console.error('Video data is not an array:', videoData);
                }
            })
            .catch((error) => {
                console.error('Error fetching video data:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const tabs = [
        { label: 'Overview', icon: 'fa-solid fa-earth-americas', path: 'overview', },
        { label: 'Notebook', icon: 'fa-solid fa-book', path: 'notepage' }
    ];
    return (
        <div className='container-content-page'>
            <div className="contentpage-left">
                <div className="content-left-title">
                    <i className="fa-solid fa-list"></i> <div>Contents</div>
                </div>

                {filteredVideos && Array.isArray(filteredVideos) && filteredVideos.length > 0 ? (
                    <div>
                        {filteredVideos.map((videoItem) => (
                            <div className="content-left-title-course "
                                onClick={() => setSelectedVideo(videoItem.attributes.videoUrl)}>
                                <div className="checkbox-container">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className="content-list-u">
                                    <div className='cursor-pointer'>{videoItem.attributes.contentName}</div>
                                    <div>  <i className="fa-regular fa-bookmark hi"></i></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No videos available.</div>
                )}  </div>

            <div className="contentpage-right">
                <div className="content-infocourse">
                    <div className="content-info-fl">
                        <div>
                            <div className="content-info1">{product.title}</div>
                            <div className="content-info2">Module introduction</div>
                        </div>
                        <div className='fl-content-option'>
                            <i className="fa-regular fa-thumbs-up"></i> <span>23</span>
                            <i className="fa-regular fa-bookmark"></i>  <span>2304</span> |
                            <i className="fa-solid fa-share"></i>
                        </div>
                    </div>
                </div>
                <div className="content-container-video">
                    <video controls src={selectedVideo || product.videoUrl}></video>
                </div>

                <div className="content-container-bottom">
                    <div className="content-nav">
                        <ul>
                            {tabs.map((tab, index) => (
                                <li key={index} className='flex gap-2'>
                                    <NavLink to={tab.path} >
                                        <i className={tab.icon} ></i> <span className='ml-2'>{tab.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )

};

export default CourseContentPage;
