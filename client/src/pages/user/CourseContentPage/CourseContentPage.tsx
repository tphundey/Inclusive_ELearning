import './ContentPage.css';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Alert, Button, Progress } from 'antd';
import { Modal } from 'antd';
import { message } from 'antd';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { EyeOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';

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
    const [videoCompletionStatus, setVideoCompletionStatus] = useState({});
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);
    const [userId, setUserId] = useState(null);
    const courseId = parseInt(id, 10);
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
    const [videoDuration, setVideoDuration] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const [numberOfCompletedVideos2, setNumberOfCompletedVideos] = useState(0);
    const [totalNumberOfVideos, setTotalNumberOfVideos] = useState(0);


    const currentUrl = window.location.href;
    const match = currentUrl.match(/\/content\/([^\/]+)\/overview/);
    const courseId2 = match ? match[1] : null;
    console.log(courseId2, 'rfsffâd');
    // Thay đổi thành ID thực tế của khóa học
    // Thay đổi thành ID thực tế của người dùng

    // Step 1: Lấy toàn bộ video của một khóa học
    fetch(`http://localhost:3000/videos/course/${courseId2}`)
        .then(response => response.json())
        .then(videoData => {
            // Lấy danh sách video và số lượng video
            const videos = videoData; // Thay đổi tùy thuộc vào cấu trúc thực tế của dữ liệu

            // Lấy danh sách video IDs
            const videoIds = videos.map(video => video.id);

            // Step 2: Lấy thông tin về tiến trình hoàn thành của người dùng
            fetch(`http://localhost:3000/UserProgress?userId=${userIdfirebase}`)
                .then(response => response.json())
                .then(userProgressData => {
                    // Lấy danh sách tiến trình hoàn thành
                    const userProgress = userProgressData;

                    // Lọc video đã hoàn thành
                    const completedVideos = videos.filter(video =>
                        userProgress.some(progress => progress.completionStatus && progress.videoId === video.id)
                    );

                    // Tính số lượng video đã hoàn thành và tổng số video
                    const numberOfCompletedVideos = completedVideos.length;
                    const totalNumberOfVideos = videos.length;


                    setNumberOfCompletedVideos(numberOfCompletedVideos)
                    setTotalNumberOfVideos(totalNumberOfVideos)
                    // Log ra số lượng video đã hoàn thành của người dùng và tổng số video trong khóa học
                    console.log(`Số video đã hoàn thành của người dùng: ${numberOfCompletedVideos}`);
                    console.log(`Tổng số video trong khóa học: ${totalNumberOfVideos}`);
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu UserProgress:', error);
                });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu videos:', error);
        });
    const progressPercentage = (numberOfCompletedVideos2 / totalNumberOfVideos) * 100;

    console.log(userIdfirebase, 'userIdfirebaseeeeeeeeeeeeeeeeeeee');

    useEffect(() => {
        axios.get('http://localhost:3000/UserProgress')
            .then((response) => {
                const userProgressData = response.data;
                const currentUserProgress = userProgressData.filter((progress: any) => progress.userId === userIdfirebase);
                const initialUserVideoCompletionStatus = {};
                currentUserProgress.forEach((progress: any) => {
                    initialUserVideoCompletionStatus[progress.videoId] = progress.completionStatus;
                });
                setUserVideoCompletionStatus(initialUserVideoCompletionStatus);
            })
            .catch((error) => {
                console.error('Error fetching user progress data:', error);
            });
    }, [userIdfirebase]);

    const [iduser, setIduser] = useState(0);
    const [paymentData, setPaymentData] = useState([]);
    const [paymentStatu2s, setPaymentStatus2] = useState(false);


    if (userIdfirebase) {
        const getUserIdByUid = async (uid) => {
            try {
                const response = await fetch(`http://localhost:3000/googleAccount`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();

                    // Lọc ra tất cả các tài khoản có uid trùng với uid được chỉ định
                    const matchingUsers = userData.filter(user => user.userId === uid);
                    console.log(matchingUsers);

                    if (matchingUsers.length > 0) {
                        // Chọn tài khoản đầu tiên trong danh sách (nếu có nhiều tài khoản trùng uid)
                        const userId = matchingUsers[0].id;
                        return userId;
                    } else {
                        console.log('User not found');
                        return null;
                    }
                } else {
                    throw new Error('Failed to fetch user data.');
                }
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        };
        // Example usage
        const uid = userIdfirebase;
        getUserIdByUid(uid)
            .then(userId => {
                if (userId) {
                    setIduser(userId)
                    console.log('User ID:', userId);
                } else {
                    console.log('User ID not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    console.log(id, 'khóa học id');
    console.log(iduser, 'id người dùng');

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const response = await fetch('http://localhost:3000/payment', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const allPaymentData = await response.json();
                    setPaymentData(allPaymentData);

                    // Kiểm tra xem có bản ghi thanh toán tương ứng với courseId và userId không
                    const isAnyPaymentRecord = allPaymentData.some(record => record.courseId === id && record.userId === iduser);
                    console.log(isAnyPaymentRecord, 'testtttttttt');

                    setPaymentStatus2(isAnyPaymentRecord); // Set trạng thái đã mua là true nếu có ít nhất một bản ghi, ngược lại là false
                } else {
                    throw new Error('Failed to fetch payment data.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        checkPaymentStatus();
    }, [id, iduser]);

    // useEffect(() => {
    //     if (!paymentStatu2s) {
    //         navigate('/error');
    //     } else {

    //     }
    // }, [paymentStatu2s]);
    // Kiểm tra xem có bản ghi thanh toán tương ứng với courseId và userId không
    const paymentRecord = paymentData.find(record => record.courseId === courseId && record.userId === userId);
    const paymentStatus = paymentRecord ? paymentRecord.paymentStatus : false;



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

                const currentUserProgress = userProgressData.filter((progress: any) => progress.userId === userIdfirebase);

                const completedVideoIds = currentUserProgress
                    .filter((progress: any) => uniqueVideoIdsInCourse.includes(progress.videoId))
                    .map((progress: any) => progress.videoId);

                const allVideosCompleted = uniqueVideoIdsInCourse.every((videoId) => completedVideoIds.includes(videoId));
                setAllVideosCompleted(allVideosCompleted);


                const [completedVideosCount, setCompletedVideosCount] = useState<number>(0);
                const [completionPercentage, setCompletionPercentage] = useState<number>(0);
                // Lưu trữ số lượng video hoàn thành trong state
                setCompletedVideosCount(completedVideosCount);
                setCompletionPercentage(completionPercentage);
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



    const handleNavigate = () => {
        window.location.href = `http://localhost:5173/getcertificate/${id}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const courseResponse = await axios.get(`http://localhost:3000/Courses/${id}`);
                const productData = courseResponse.data;
                setProduct(productData);

                const allVideosResponse = await axios.get(`http://localhost:3000/Videos`);
                const allVideos = allVideosResponse.data;

                const filteredVideos = allVideos.filter((video: any) => {
                    return video.courseId === id;
                });

                setVideos(filteredVideos);

                if (filteredVideos.length > 0) {
                    setSelectedVideoUrl(filteredVideos[0].videoURL);
                    setCurrentVideo(filteredVideos[0]);
                }

                const allVideoIds = filteredVideos.map((video: { id: any; }) => video.id);
                const userCompletedVideos = allVideoIds.every((videoId: string | number) => userVideoCompletionStatus[videoId]);
                console.log('Trạng thái hoàn thành khóa học:', userCompletedVideos);
                if (userCompletedVideos === true) {
                    setShowSuccessAlert(true);
                }
                setAllVideosCompleted(userCompletedVideos);

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

    }, [id, auth, userVideoCompletionStatus, userIdfirebase, courseId]);



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

        if (hasChangedVideo) {
            setHasChangedVideo(false);
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



    const fetchLatestVideoDuration = () => {
        // Kiểm tra nếu userID không bằng 1 thì không gửi yêu cầu API
        if (userIdfirebase !== userIdfirebase) {
            console.log('UserID không hợp lệ');
            return;
        }
        const API_URL = 'http://localhost:3000/userVideoProgress';
        axios
            .get(API_URL)
            .then((response) => {
                if (response.data.length > 0) {
                    const reversedData = response.data.reverse();

                    const latestRecord = reversedData[0];

                    const watchedTimeInSeconds = latestRecord.watchedTime;
                    const minutes = Math.floor(watchedTimeInSeconds / 60);
                    const seconds = watchedTimeInSeconds % 60;
                    const formattedDuration = `${minutes} phút ${seconds} giây`;

                    setVideoDuration(formattedDuration);
                    setIsModalOpen(true);
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

    const handleResize = () => {
        if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
            window.location.href = '/signup/404';
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    if (!product) {
        return <div>Loading...</div>;
    }
    const tabs = [
        { label: 'Tổng quan', icon: 'fa-solid fa-earth-americas', path: 'overview' },
        { label: 'Ghi chú', icon: 'fa-solid fa-book', path: 'notepage' }
    ];


    const completedVideos = Object.values(videoCompletionStatus).filter(status => status === true).length;
    const completionPercentage = (completedVideos / totalVideos) * 100;

    const currentUserId = userIdfirebase;

    // Lọc ra các bản ghi từ UserProgress có userId trùng với người dùng hiện tại
    const userProgressForCurrentUser = UserProgress.filter(progress => progress.userId === currentUserId);

    // Sử dụng Set để theo dõi videoId đã xem xét
    const examinedVideoIds = new Set();

    // Lấy danh sách tất cả video trong khóa học, loại bỏ các videoId trùng nhau
    const uniqueVideoIdsInCourse = Array.from(new Set(product.videoID));

    // Lọc ra các bản ghi từ UserProgress của người dùng hiện tại và thuộc khóa học
    const userProgressForCurrentCourse = userProgressForCurrentUser.filter(progress => {
        if (!examinedVideoIds.has(progress.videoId)) {
            examinedVideoIds.add(progress.videoId);
            return uniqueVideoIdsInCourse.includes(progress.videoId);
        }
        return false;
    });

    const handleCopyToClipboard = () => {
        const currentURL = window.location.href;

        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = currentURL;
        document.body.appendChild(textarea);

        // Select and copy the URL
        textarea.select();
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(textarea);
        message.success('URL copied to clipboard!');

    };

    const numberOfCompletedVideos = userProgressForCurrentCourse.filter(progress => progress.completionStatus).length;
    const calculatedCompletionPercentage = (numberOfCompletedVideos / uniqueVideoIdsInCourse.length) * 100;

    const minutes = Math.floor(watchedTimeOnReturn / 60);
    const seconds = watchedTimeOnReturn % 60;

    const handleContextMenu = (e) => {
        e.preventDefault();
    };
    const formattedTime = `${minutes} phút ${seconds.toFixed(0)} giây`;
    const formattedPrice = formatCurrency(product.price);
    return (
        <div onContextMenu={handleContextMenu} className='container-content-page '>
            <div className="contentpage-left">
                <div className='content-intro'>
                    <div className="content-left-title">
                        <i className="fa-solid fa-list"></i> <div>Mục lục</div>
                    </div>
                    <Progress percent={progressPercentage} status="success" />
                </div>
                <div>
                    {paymentStatu2s || formattedPrice == '0 ₫' ? (
                        <>
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
                                                <EyeOutlined />
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
                                            <Button type="dashed" onClick={handleNavigate}>
                                                Nhận chứng chỉ
                                            </Button>
                                        }
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <p className='text-red-600'>Người dùng chưa thanh toán khóa học.</p>
                    )}


                </div>
            </div>

            <div className="contentpage-right">
                <div className="content-infocourse">
                    <div className="content-info-fl">
                        <div>
                            <div className="content-info1">Tên khóa học: {product.courseName}</div>
                            <div className="content-info2">Giới thiệu</div>
                        </div>
                        <div className='fl-content-option'>
                            {/* <i className="fa-regular fa-thumbs-up"></i> <span>23</span> */}
                            |
                            <i className="fa-solid fa-share" onClick={handleCopyToClipboard}></i>
                        </div>
                    </div>
                </div>
                <div className="content-container-video">
                    {paymentStatu2s || formattedPrice == '0 ₫' ? (
                        <div className="video-container">
                            <video
                                controls
                                autoPlay
                                src={selectedVideoUrl}
                                onEnded={handleVideoEnded}
                                onTimeUpdate={handleVideoTimeUpdate}
                                onContextMenu={(e) => e.preventDefault()}
                                controlsList="nodownload"
                            ></video>
                            <div className="watermark"><img src="https://res-console.cloudinary.com/dsk9jrxzf/media_explorer_thumbnails/7e95ab28f227ce57b95d20e1ad99a579/detailed" alt="" /></div>
                        </div>
                    ) : (
                        <p className='text-white'>Người dùng chưa thanh toán khóa học.</p>
                    )}
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
                            <p>Thời lượng video: {formattedTime}</p>
                        </Modal>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContentPage;
