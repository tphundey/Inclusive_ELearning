import './ContentPage.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { Modal } from 'antd';
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
    const [videoCompletionStatus, setVideoCompletionStatus] = useState({});
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);
    const [initialUserProgress, setInitialUserProgress] = useState(null);
    const courseId = id; // Đặt ID khoá học của bạn ở đây
    const courseApiUrl = `http://localhost:3000/Courses/${courseId}`;
    const userProgressApiUrl = 'http://localhost:3000/UserProgress';
    const [course, setCourse] = useState(null);
    const [allVideosCompleted, setAllVideosCompleted] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [videoWatchedTime, setVideoWatchedTime] = useState(0);
    const [watchedTimeOnReturn, setWatchedTimeOnReturn] = useState(0);
    const [showWatchedTimeModal, setShowWatchedTimeModal] = useState(false);
    const [hasChangedVideo, setHasChangedVideo] = useState(false);
    const [totalWatchedTime, setTotalWatchedTime] = useState(0);
    const handleReturnButtonClick = () => {
        // Hiển thị thông báo với thời gian đã xem video khi quay trở lại
        setShowWatchedTimeModal(true);
    };
    useEffect(() => {
        // Fetch thông tin khoá học từ API
        axios.get(courseApiUrl)
            .then((response) => {
                const courseData = response.data;
                setCourse(courseData);

                // Lấy danh sách videoID từ khoá học
                const videoIdsInCourse = courseData.videoID;

                // Fetch danh sách video đã hoàn thành từ API
                axios.get(userProgressApiUrl)
                    .then((userProgressResponse) => {
                        const userProgressData = userProgressResponse.data;

                        // Lấy danh sách videoID đã hoàn thành
                        const completedVideoIds = userProgressData
                            .filter((progress: any) => videoIdsInCourse.includes(progress.videoId))
                            .map((progress: any) => progress.videoId);

                        // Kiểm tra xem tất cả videoID đã hoàn thành hay chưa
                        const allVideosCompleted = videoIdsInCourse.every((videoId: any) => completedVideoIds.includes(videoId));

                        setAllVideosCompleted(allVideosCompleted);

                        if (allVideosCompleted) {
                            setShowSuccessAlert(true);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user progress data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching course data:', error);
            });
    }, [courseApiUrl, userProgressApiUrl]);

    const handleNavigate = () => {
        window.location.href = `http://localhost:5173/test/${id}`;
    };


    useEffect(() => {
        axios.get('http://localhost:3000/UserProgress')
            .then((response) => {
                const userProgressData = response.data;
                // Tạo một đối tượng trạng thái hoàn thành video ban đầu từ dữ liệu API
                const initialVideoCompletionStatus = {};
                userProgressData.forEach((progress) => {
                    initialVideoCompletionStatus[progress.videoId] = progress.completionStatus;
                });
                setVideoCompletionStatus(initialVideoCompletionStatus);
            })
            .catch((error) => {
                console.error('Error fetching initial user progress data:', error);
            });
    }, []);

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

    const handleVideoTitleClick = (videoURL: any, video: any) => {
        setHasChangedVideo(true); // Đã chuyển video
        setSelectedVideoUrl(videoURL);
        setCurrentVideo(video);
        setVideoWatched(false);
    };

    const handleVideoEnded = () => {
        if (currentVideo) {
            setVideoWatched(true);
            const updatedCompletionStatus = {
                ...videoCompletionStatus,
                [currentVideo.id]: true,
            };

            setVideoCompletionStatus(updatedCompletionStatus);

            axios.post(`http://localhost:3000/UserProgress`, {
                userId: userId,
                videoId: currentVideo.id,
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

    // Sử dụng useEffect để lắng nghe sự kiện thay đổi trạng thái biểu tượng
    useEffect(() => {
        if (isVideoCompleted) {
        }
    }, [isVideoCompleted]);

    const [watchedTime, setWatchedTime] = useState(0);

    const handleVideoTimeUpdate = (event) => {
        const currentTime = event.target.currentTime;
        setWatchedTime(currentTime);
        console.log(currentTime, 'currenttime');

        // Kiểm tra xem thời gian xem video hiện tại có lớn hơn thời gian đã lưu trong localStorage hay không
        const savedWatchedTime = localStorage.getItem('videoWatchedTime');

        if (savedWatchedTime) {
            const parsedSavedWatchedTime = parseFloat(savedWatchedTime);

            if (currentTime > parsedSavedWatchedTime) {
                window.addEventListener('beforeunload', () => {
                    // Lưu dữ liệu vào localStorage trước khi người dùng thoát trang
                    localStorage.setItem('videoWatchedTime', currentTime.toString());
                });
            }
        } else {
            // Nếu chưa có thời gian xem video trong localStorage, lưu giá trị hiện tại
            localStorage.setItem('videoWatchedTime', currentTime.toString());
        }

        // Tính thời gian đã xem so với thời lượng của video (ví dụ: 90% đã xem)
        const watchedPercentage = (currentTime / event.target.duration) * 100;

        // Lưu thời gian xem video vào localStorage
        localStorage.setItem('videoWatchedTime', currentTime.toString());

        if (watchedPercentage >= 90 && !isVideoCompleted) {
            setIsVideoCompleted(true);

            // Gửi dữ liệu lên API khi video đã hoàn thành
            if (currentVideo) {
                const updatedCompletionStatus = {
                    ...videoCompletionStatus,
                    [currentVideo.id]: true,
                };

                setVideoCompletionStatus(updatedCompletionStatus);

                axios.post(`http://localhost:3000/userVideoProgress`, {
                    userId: userId,
                    videoId: currentVideo.id,
                    watchedTime: videoWatchedTime,
                })
                    .then((response) => {
                        console.log('User video progress updated successfully:', response.data);
                    })
                    .catch((error) => {
                        console.error('Error updating user video progress:', error);
                    });
            }
        }

        if (!isVideoCompleted && currentTime > watchedTimeOnReturn) {
            setWatchedTimeOnReturn(currentTime);
        }

        // Kiểm tra xem người dùng đã chuyển video hay chưa
        if (hasChangedVideo) {
            setHasChangedVideo(false);

            // Lưu thời gian đã xem video hiện tại sau khi chuyển video
            setWatchedTimeOnReturn(currentTime);
        }
    };

    useEffect(() => {
        // Kiểm tra xem có dữ liệu thời gian xem video trong localStorage hay không
        const savedWatchedTime = localStorage.getItem('videoWatchedTime');

        if (savedWatchedTime) {
            // Chuyển giá trị từ chuỗi thành số
            const parsedSavedWatchedTime = parseFloat(savedWatchedTime);

            // Kiểm tra xem thời gian xem video hiện tại có lớn hơn thời gian đã lưu trong localStorage hay không
            if (videoWatchedTime > parsedSavedWatchedTime) {
                // Cập nhật thời gian xem video từ localStorage
                setVideoWatchedTime(parsedSavedWatchedTime);
            }
        }
    }, [videoWatchedTime]);

    const sendWatchedTimeToAPI = () => {
        axios
            .post('http://localhost:3000/userVideoProgress', {
                userId: userId,
                videoId: id,
                watchedTime: watchedTime,
            })
            .then((response) => {
                console.log('Thời gian xem video đã được gửi lên API:', response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi gửi thời gian xem video lên API:', error);
            });
    };
    const [videoDuration, setVideoDuration] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hàm để lấy thời lượng video từ API
    // Hàm để lấy thời lượng video từ API
    const fetchVideoDuration = () => {
        // Thay thế URL_CUA_API và videoId bằng URL và videoID thực tế
        const API_URL = `http://localhost:3000/userVideoProgress/${id}`;
        console.log(API_URL);

        axios
            .get(API_URL)
            .then((response) => {
                setVideoDuration(response.data.watchedTime); // Đặt thời lượng video vào state
                setIsModalOpen(true); // Mở modal sau khi lấy được thời lượng
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thời lượng video từ API:', error);
            });
    };
    const fetchLatestVideoDuration = () => {
        // Kiểm tra nếu userID không bằng 1 thì không gửi yêu cầu API
        if (userId !== 1) {
            console.log('UserID không hợp lệ');
            return;
        }

        // Sử dụng URL truy vấn để sắp xếp theo ID giảm dần và lấy dữ liệu với ID lớn nhất
        const API_URL = `http://localhost:3000/userVideoProgress?_sort=id&_order=desc&_limit=1`;

        axios
            .get(API_URL)
            .then((response) => {
                if (response.data.length > 0) {
                    const latestRecord = response.data[0];
                    const watchedTimeInSeconds = latestRecord.watchedTime; // Thời lượng video tính bằng giây
                    const minutes = Math.floor(watchedTimeInSeconds / 60);
                    const seconds = watchedTimeInSeconds % 60;
                    const formattedDuration = `${minutes} phút ${seconds} giây`;
                    setVideoDuration(formattedDuration); // Đặt thời lượng video vào state
                    setIsModalOpen(true); // Mở modal sau khi lấy được thời lượng
                } else {
                    console.log('Không tìm thấy bất kỳ dữ liệu nào.');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thời lượng video từ API:', error);
            });
    };

    // Thêm hàm để đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Sau khi lấy dữ liệu thời lượng video, gọi hàm để đóng modal
    const handleModalClose = () => {
        closeModal();
    };
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
                        const isVideoCompleted = videoCompletionStatus[video.id] || false;

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

                                        <i className="fa-regular fa-bookmark hi"></i>

                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div>
                        <br />
                        {showSuccessAlert && (
                            <Alert
                                message="Bạn đã hoàn thành chứng chỉ!"
                                type="success"
                                showIcon
                                description={
                                    <Button className='chungchi' type="primary" onClick={handleNavigate}>
                                        Nhận chứng chỉ
                                    </Button>
                                }
                            />
                        )}
                    </div>
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
                    <video controls autoPlay src={selectedVideoUrl}
                        onEnded={handleVideoEnded}
                        onTimeUpdate={handleVideoTimeUpdate}
                    ></video>

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
                        <div>
                            {/* <button className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm' onClick={handleReturnButtonClick}>Quay lại video</button> */}
                            <button className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm' onClick={sendWatchedTimeToAPI}>Gửi thời gian xem hiện tại</button>
                            <button className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm' onClick={fetchLatestVideoDuration}>Lấy thời gian xem dở</button>
                        </div>
                        <Modal
                            title="Thời gian đã xem video khi quay trở lại"
                            visible={showWatchedTimeModal}
                            onOk={() => setShowWatchedTimeModal(false)}
                            onCancel={() => setShowWatchedTimeModal(false)}
                        >
                            <p>Thời gian đã xem video khi quay trở lại: {watchedTimeOnReturn} giây</p>
                        </Modal>
                        {/* Modal hiển thị thời lượng video */}
                        <Modal open={isModalOpen} onCancel={handleModalClose}>
                            <p>Thời lượng video: {videoDuration} giây</p>
                        </Modal>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContentPage;
