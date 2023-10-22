import './ContentPage.css'
import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const CourseContentPage = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/Courses/${id}`)
            .then((response) => {
                // Lưu thông tin sản phẩm vào state
                console.log(response.data);
                const productData = response.data;
                setProduct(productData);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3000/Courses/${id}`)
            .then((response) => {
                const productData = response.data;
                setProduct(productData);

                // Assuming you have an API endpoint to fetch all videos
                axios.get(`http://localhost:3000/Videos`)
                    .then((videoResponse) => {
                        const allVideos = videoResponse.data;
                        const videoIdsInCourse = productData.videoID;

                        // Filter videos based on video IDs in the course
                        const filteredVideos = allVideos.filter((video) =>
                            videoIdsInCourse.includes(video.id)
                        );

                        setVideos(filteredVideos);

                        // Set the default video URL as the first video in the course
                        if (filteredVideos.length > 0) {
                            setSelectedVideoUrl(filteredVideos[0].videoURL);
                        }
                    })
                    .catch((videoError) => {
                        console.error('Error fetching video data:', videoError);
                    });
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    const handleVideoTitleClick = (videoURL) => {
        setSelectedVideoUrl(videoURL);
    };


    // Không sửa dưới đây
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

                <div>
                    {videos.map((video) => (
                        <div className="content-left-title-course ">
                            <div className="checkbox-container">
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className="content-list-u">
                                <div className='cursor-pointer' onClick={() => handleVideoTitleClick(video.videoURL)} key={video.id}>{video.videoTitle}</div>
                                <div>  <i className="fa-regular fa-bookmark hi"></i></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="contentpage-right">
                <div className="content-infocourse">
                    <div className="content-info-fl">
                        <div>
                            <div className="content-info1">{product.courseName}</div>
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
                    <video controls autoPlay src={selectedVideoUrl}></video>
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
