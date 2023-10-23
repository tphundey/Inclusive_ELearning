import './ContentPage.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

const CourseContentPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [videos, setVideos] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
    const [videoWatched, setVideoWatched] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [UserProgress, setUserProgress] = useState([]);
    const [userId, setUserId] = useState(null);
    // Xác định trạng thái cho việc hoàn thành video
    const [videoCompletionStatus, setVideoCompletionStatus] = useState<{ [key: number]: boolean }>({});
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);

    // Bước 1: Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
    const encryptedProfile = localStorage.getItem('profile');
    if (encryptedProfile) {
        const decryptedProfile = decodeData(encryptedProfile);
        const profile = JSON.parse(decryptedProfile);
        var userEmail = profile.email;
        console.log('Email của người dùng:', userEmail);
    } else {
        console.log('Không tìm thấy thông tin người dùng đã mã hóa trong Local Storage.');
    }

    fetch(`http://localhost:3000/googleAccount?email=${userEmail}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to retrieve user ID from the API.');
            }
        })
        .then((data) => {
            const user = data.find((item: any) => item.email === userEmail);
            const userrID = user.id;
            setUserId(userrID); // Lưu userId vào state
            console.log(user.id);
        });

    useEffect(() => {
        // Fetch course details
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
                            setCurrentVideo(filteredVideos[0]);
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

    const handleVideoTitleClick = (videoURL, video) => {
        setSelectedVideoUrl(videoURL);
        setCurrentVideo(video);

        // Cập nhật trạng thái xem video
        setVideoWatched(false);
    };

    const handleVideoEnded = () => {
        // Tại đây, bạn có thể thực hiện các hành động khi video kết thúc, ví dụ như cập nhật trạng thái xem video và gửi thông tin lên API.
        if (currentVideo) {
            setVideoWatched(true);
            // Cập nhật trạng thái hoàn thành của video trong state
            setVideoCompletionStatus((prevStatus) => ({
                ...prevStatus,
                [currentVideo.id]: true, // Đặt trạng thái hoàn thành là true cho video hiện tại
            }));
            // Send progress to the API
            axios.post(`http://localhost:3000/UserProgress`, {
                userId: userId,
                videoId: currentVideo.id, // Sử dụng thông tin video hiện tại
                completionStatus: true,
            })
                .then((response) => {
                    console.log('User progress updated successfully:', response.data);
                })
                .catch((error) => {
                    console.error('Error updating user progress:', error);
                });
        }
    };
    useEffect(() => {
        // Fetch UserProgress data from your API
        axios.get('http://localhost:3000/UserProgress')
            .then((response) => {
                const userProgressData = response.data;
                // Lưu dữ liệu vào state hoặc context để sử dụng trong thành phần của bạn
                setUserProgress(userProgressData); // setUserProgress là một state hoặc context của bạn
            })
            .catch((error) => {
                console.error('Error fetching UserProgress data:', error);
            });
    }, []);

    const handleVideoCompletion = () => {
        // Khi video hoàn thành, thay đổi trạng thái của biểu tượng
        setIsVideoCompleted(true);

        // Gửi thông tin cập nhật lên API tại đây nếu cần
    };

    // Sử dụng useEffect để lắng nghe sự kiện thay đổi trạng thái biểu tượng
    useEffect(() => {
        if (isVideoCompleted) {
            // Biểu tượng đã hoàn thành, thực hiện các hành động cần thiết
            // Ví dụ: Gửi thông tin lên API
            // axios.post(`http://your-api-url/update-icon`, { iconStatus: 'completed' })
        }
    }, [isVideoCompleted]);
    if (!product) {
        return <div>Loading...</div>;
    }

    const tabs = [
        { label: 'Overview', icon: 'fa-solid fa-earth-americas', path: 'overview' },
        { label: 'Notebook', icon: 'fa-solid fa-book', path: 'notepage' }
    ];

    return (
        <div className='container-content-page'>
            <div className="contentpage-left">
                <div className="content-left-title">
                    <i className="fa-solid fa-list"></i> <div>Contents</div>
                </div>

                <div>
                    {videos.map((video) => {
                        const userVideoProgress = UserProgress.find((progress) => progress.videoId === video.id);
                        const isVideoCompleted = userVideoProgress && userVideoProgress.completionStatus;

                        return (
                            <div className="content-left-title-course" key={video.id}>
                                <div className="checkbox-container">
                                {isVideoCompleted ? (
                                        <i className="fa-solid fa-check"></i>
                                    ) : (
                                        <i className="fa-regular fa-circle"></i>
                                    )}
                                </div>
                                <div className="content-list-u">
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => handleVideoTitleClick(video.videoURL, video)}
                                    >
                                        {video.videoTitle}
                                    </div>
                                    <div>
                                        {videoCompletionStatus[video.id] ? (
                                            <i className="fa-regular fa-bookmark hi"></i>
                                        ) : (
                                            <i className="fa-regular fa-bookmark"></i>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}




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
                    <video controls autoPlay src={selectedVideoUrl} onEnded={handleVideoEnded}></video>
                </div>

                <div className="content-container-bottom">
                    <div className="content-nav">
                        <ul>
                            {tabs.map((tab, index) => (
                                <li key={index} className='flex gap-2'>
                                    <NavLink to={tab.path} >
                                        <i className={tab.icon}></i> <span className='ml-2'>{tab.label}</span>
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
    );
};

export default CourseContentPage;
