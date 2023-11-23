import './ContentPage.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { Modal } from 'antd';
import { message } from 'antd';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    const courseId = parseInt(id, 10);
    const courseApiUrl = `http://localhost:3000/Courses/${courseId}`;
    const userProgressApiUrl = 'http://localhost:3000/UserProgress';
    const [course, setCourse] = useState(null);
    const [allVideosCompleted, setAllVideosCompleted] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [videoWatchedTime, setVideoWatchedTime] = useState(0);
    const [watchedTimeOnReturn, setWatchedTimeOnReturn] = useState(0);
    const [showWatchedTimeModal, setShowWatchedTimeModal] = useState(false);
    const [hasChangedVideo, setHasChangedVideo] = useState(false);
    const [totalVideos, setTotalVideos] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [userEmail, setuserEmail] = useState<any | null>(null);
    const [userIdfirebase, setuserIdfirebase] = useState<any | null>(null);
    const [userVideoCompletionStatus, setUserVideoCompletionStatus] = useState({});

    useEffect(() => {
        // Lấy dữ liệu tiến trình của người dùng với userId là 1
        axios.get('http://localhost:3000/UserProgress')
            .then((response) => {
                const userProgressData = response.data;


                const currentUserProgress = userProgressData.filter((progress) => progress.userId === userIdfirebase);


                console.log('Filtered User Progress Data', currentUserProgress);

                // Tạo đối tượng để lưu trạng thái hoàn thành của video
                const initialUserVideoCompletionStatus = {};

                // Xây dựng trạng thái hoàn thành của video từ dữ liệu lọc
                currentUserProgress.forEach((progress) => {
                    initialUserVideoCompletionStatus[progress.videoId] = progress.completionStatus;
                });

                // Log thông tin về trạng thái hoàn thành của video
                console.log('Initial User Video Completion', initialUserVideoCompletionStatus);

                // Lưu trạng thái hoàn thành của video vào state
                setUserVideoCompletionStatus(initialUserVideoCompletionStatus);
            })
            .catch((error) => {
                console.error('Error fetching user progress data:', error);
            });
    }, [userIdfirebase]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setuserEmail(currentUser?.email)
            setuserIdfirebase(currentUser?.uid)
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch course details
                const response = await axios.get(`http://localhost:3000/Courses/${id}`);
                const productData = response.data;
                setProduct(productData);

                const uniqueVideoIdsInCourse = Array.from(new Set(productData.videoID));

                const userProgressResponse = await axios.get('http://localhost:3000/UserProgress');
                const userProgressData = userProgressResponse.data;

                // Filter user progress based on current user
                const currentUserProgress = userProgressData.filter((progress) => progress.userId === userIdfirebase);

                const completedVideoIds = currentUserProgress
                    .filter((progress) => uniqueVideoIdsInCourse.includes(progress.videoId))
                    .map((progress) => progress.videoId);

                const allVideosCompleted = uniqueVideoIdsInCourse.every((videoId) => completedVideoIds.includes(videoId));
                setAllVideosCompleted(allVideosCompleted);

                console.log('Course Data:', productData);
                console.log('Video IDs in Course:', uniqueVideoIdsInCourse);
                console.log('Initial User Video Completion:', userVideoCompletionStatus);
                console.log('All Videos Completed:', allVideosCompleted);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setuserIdfirebase(currentUser.uid);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [id, auth, userVideoCompletionStatus, userIdfirebase]);

    useEffect(() => {
        if (allVideosCompleted) {
            setShowSuccessAlert(true);
        }
    }, [allVideosCompleted]);

    const handleNavigate = () => {
        window.location.href = `http://localhost:5173/getcertificate/${id}`;
    };




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
        if (currentVideo && userIdfirebase) {
            setVideoWatched(true);
            const updatedCompletionStatus = {
                ...videoCompletionStatus,
                [currentVideo.id]: true,
            };

            setVideoCompletionStatus(updatedCompletionStatus);

            axios.post(`http://localhost:3000/UserProgress`, {
                userId: userIdfirebase,
                videoId: currentVideo.id,
                completionStatus: true,
            })
                .then((response) => {
                    console.log('User progress updated successfully:', response.data);

                    // Fetch updated user progress data and update the state
                    axios.get('http://localhost:3000/UserProgress')
                        .then((response) => {
                            const userProgressData = response.data;
                            const currentUserProgress = userProgressData.filter((progress) => progress.userId === userIdfirebase);

                            const updatedUserVideoCompletionStatus = {};
                            currentUserProgress.forEach((progress) => {
                                updatedUserVideoCompletionStatus[progress.videoId] = progress.completionStatus;
                            });

                            setUserVideoCompletionStatus(updatedUserVideoCompletionStatus);
                        })
                        .catch((error) => {
                            console.error('Error fetching user progress data:', error);
                        });
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

    const handleVideoTimeUpdate = (event: any) => {
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
                userId: userIdfirebase,
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


    const fetchLatestVideoDuration = () => {
        // Kiểm tra nếu userID không bằng 1 thì không gửi yêu cầu API
        if (userIdfirebase !== userIdfirebase) {
            console.log('UserID không hợp lệ');
            return;
        }

        // Sử dụng URL truy vấn để sắp xếp theo ID giảm dần và lấy dữ liệu với ID lớn nhất
        const API_URL = `http://localhost:3000/userVideoProgress?_sort=id&_order=desc&_limit=1`;

        axios
            .get(API_URL)
            .then((response: any) => {
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




    // Tính số video đã hoàn thành
    const completedVideos = Object.values(videoCompletionStatus).filter(status => status === true).length;
    const completionPercentage = (completedVideos / totalVideos) * 100;


    const handleBookmarkClick = () => {
        // Bước 1: Lấy thông tin người dùng từ API
        fetch(`http://localhost:3000/googleAccount?email=${userEmail}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to retrieve user data from the API.');
                }
            })
            .then((userData) => {
                const user = userData[0]; // Lấy người dùng đầu tiên, bạn có thể xác định người dùng một cách cụ thể

                // Bước 2: Lấy danh sách khóa học đã lưu của người dùng
                const savedCourses = user.courseSaved || []; // Danh sách khóa học đã lưu

                // Kiểm tra xem courseID đã tồn tại trong danh sách đã lưu chưa
                if (!savedCourses.includes(courseId)) {
                    // Nếu chưa tồn tại, thêm courseID vào danh sách đã lưu
                    savedCourses.push(courseId);

                    // Bước 3: Cập nhật danh sách khóa học đã lưu của người dùng
                    user.courseSaved = savedCourses;

                    // Kiểm tra xem user.id có phải là số hay không
                    if (typeof user.id !== 'number') {
                        // Chuyển đổi user.id thành số nếu nó không phải là số
                        user.id = parseInt(user.id);
                    }

                    // Bước 4: Cập nhật dữ liệu người dùng sau khi lưu khóa học
                    fetch(`http://localhost:3000/googleAccount/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    })
                        .then((updateResponse) => {
                            if (updateResponse.ok) {
                                // Hiển thị thông báo thành công
                                message.success('Lưu khóa học thành công !');
                            } else {
                                throw new Error('Failed to update user data.');
                            }
                        })
                        .catch((updateError) => {
                            console.error('Error updating user data:', updateError);
                            message.error('Failed to update user data.');
                        });
                } else {
                    console.log('Khóa học đã được lưu.');
                    message.error('Khóa học đã được lưu.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
            });
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
                <div className='content-intro'>
                    <div className="content-left-title">
                        <i className="fa-solid fa-list"></i> <div>Contents</div>
                    </div>
                    <div className='pro-content'>
                        {/* <p className=''>Tổng số video: {totalVideos}</p> */}
                        <div className="radial-progress text-white pro-content bg-gray-800" style={{ "--value": `${completionPercentage.toFixed(2)}`, fontSize: "15px", width: "50px", height: "50px", borderRadius: "50%" }}>
                            {completionPercentage >= 1 && completionPercentage <= 100 ? `${Math.round(completionPercentage)}` : "100%"}
                        </div>
                    </div>
                </div>
                <div>
                    {videos.map((video: any) => {
                        const isVideoCompleted = userVideoCompletionStatus[video.id] || false;

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
                            <i className="fa-regular fa-bookmark" onClick={handleBookmarkClick}></i> <span>2304</span> |
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
                            <button className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm' onClick={sendWatchedTimeToAPI}>Đánh dấu thời gian xem hiện tại</button>
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
                            <p>Thời lượng video: {videoDuration}</p>
                        </Modal>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContentPage;
