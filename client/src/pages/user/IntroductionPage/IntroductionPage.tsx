import './introduction.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating, Typography } from "@material-tailwind/react";
import Input from 'antd/es/input/Input';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { renderReviewRateIcon } from './ratingIcons';
import moment from 'moment';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

const IntroductionPage = () => {
    const [rated, setRated] = React.useState(4);
    const [product, setProduct] = useState<any>({});
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [review, setReview] = useState({ rating: 4, comment: '' });;
    const [users, setUsers] = useState<any[]>([]);
    const { id } = useParams();
    const [, setEncryptedData] = useState<any>(null);
    const courseID = parseInt(id, 10);
    const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({});
    const [canDisplayForm, setCanDisplayForm] = useState(false); // State để kiểm tra xem có thể hiển thị form hay không
    const [userID, setUserID] = useState(null);
    /////////////////////////////////////
    const [videos, setVideos] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
    const [currentVideo, setCurrentVideo] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showWatchedTimeModal, setShowWatchedTimeModal] = useState(false);

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
                        const filteredVideos = allVideos.filter((video) =>
                            videoIdsInCourse.includes(video.id)
                        );
                        setVideos(filteredVideos);
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


    const handleReturnButtonClick = () => {
        // Hiển thị thông báo với thời gian đã xem video khi quay trở lại
        setShowWatchedTimeModal(true);
    };
    // Bước 1: Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
    const encryptedProfile = localStorage.getItem('profile');
    if (encryptedProfile) {
        const decryptedProfile = decodeData(encryptedProfile);
        // Bước 2: Chuyển thông tin đã giải mã thành đối tượng JSON
        const profile = JSON.parse(decryptedProfile);
        // Bước 3: Lấy email từ đối tượng profile
        var userEmail = profile.email;
        console.log('Email của người dùng:', userEmail);
        // Bước 4: Sử dụng email trong truy vấn hoặc hiển thị
    } else {
        console.log('Không tìm thấy thông tin người dùng đã mã hóa trong Local Storage.');
    }

    // Thực hiện GET request để lấy ID từ API
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
            // Bước 3: Lấy ID từ dữ liệu API
            const userID = user.id;
            setUserID(userID); // Đặt giá trị userID vào state
            console.log(user.id, 'Từ state');
        })
        .catch((error) => {
            console.error(error);
            // Xử lý lỗi nếu có
        });


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/Payment`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from the API.');
                }
                const data = await response.json();
                console.log(data);

                if (data) {
                    const payment = data.find((item: any) => item.courseID === courseID && item.userID === userID && item.payment_status === true);
                    if (payment) {
                        setCanDisplayForm(true);
                    }
                } else {
                    console.log('Dữ liệu không hợp lệ hoặc không có thuộc tính Payment.');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
        fetchData();
    }, [courseID, userID]);


    useEffect(() => {
        axios.get(`http://localhost:3000/Reviews?courseID=${id}`)
            .then((response) => {
                console.log(response.data); // Ghi lại dữ liệu từ API
                setReviews(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);;
    useEffect(() => {
        const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        reviews.forEach((review) => {
            counts[review.rating] += 1;
        });

        setRatingCounts(counts);
    }, [reviews]);

    useEffect(() => {
        async function start() {
            // Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
            const encryptedProfile: any = localStorage.getItem('profile');
            if (encryptedProfile) {
                const decryptedProfile: any = decodeData(encryptedProfile);
                console.log('Thông tin đã được giải mã từ localStorage:', decryptedProfile);
                setEncryptedData(decryptedProfile);
            }
            else {
                console.log('Ko chạy');
            }
        }
        start();
    }, []);


    const handleBuyButtonClick = () => {

        const { price } = product; // Lấy giá sản phẩm từ trường price của object product
        const paymentAmount = parseFloat(price);
        // Thực hiện GET request để lấy ID từ API
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
                // Bước 3: Lấy ID từ dữ liệu API
                const userID = user.id;
                setUserID(userID); // Đặt giá trị userID vào state
                console.log(user.id, 'Từ state');

                // Bước 4: Thực hiện POST request để tạo payment
                const paymentData = {
                    userID: userID, // Sử dụng userID lấy được từ API
                    courseID: courseID, // Chọn courseID tùy theo logic của bạn
                    coupon: "null",
                    paymentAmount: paymentAmount,
                    date: "2023-09-29",
                    payment_status: true
                };

                return fetch('http://localhost:3000/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentData),
                });
            })
            .then((response) => {
                if (response.ok) {
                    console.log('Payment successful');
                    // Xử lý khi payment thành công
                } else {
                    throw new Error('Payment failed.');
                }
            })
            .catch((error) => {
                console.error(error);
                // Xử lý lỗi nếu có
            });

    };






    // end thanh toán/////////////////////////////////////////////////////////////
    const handleRatingChange = (value: any) => {
        // Cập nhật rating trong state
        setReview({ ...review, rating: value });


        // Cập nhật rated để hiển thị số tương ứng
        setRated(value);
    };
    useEffect(() => {
        if (id) {
            // Chuyển đổi _id thành chuỗi
            const stringId = id.toString();
            const apiUrl = `http://localhost:3000/Courses/${stringId}`;
            axios
                .get(apiUrl)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    useEffect(() => {
        // Lấy tất cả sản phẩm có cùng categoryID
        if (product.categoryID) {
            const apiUrl = `http://localhost:3000/Courses?categoryID=${product.categoryID}`;
            axios.get(apiUrl)
                .then((response) => {
                    setSimilarProducts(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [product.categoryID]);

    useEffect(() => {
        // Lấy tất cả đánh giá từ API có courseID trùng với id trên URL
        axios.get(`http://localhost:3000/Reviews?courseID=${id}`)
            .then((response) => {
                setReviews(response.data);
                console.log(response.data);

            })
            .catch((error) => {
                console.error(error);
            });

        // Lấy tất cả người dùng từ API
        axios
            .get('http://localhost:3000/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    function findUserById(userID: any) {
        return users.find((user) => user.id === userID);
    }

    function calculateAverageRating(reviews: any) {
        if (reviews && reviews.length > 0) {
            const totalRating = reviews.reduce(
                (accumulator: any, review: any) => accumulator + review.rating,
                0
            );
            const averageRating = totalRating / reviews.length;
            return averageRating.toFixed(1); // Giới hạn số thập phân
        }
        return 0;
    }

    function convertToStarRating(averageRating: string) {
        const maxStars = 5;
        const fullStars = Math.floor(parseFloat(averageRating));
        const halfStar = parseFloat(averageRating) % 1 !== 0;
        const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

        const starRating = [];
        for (let i = 0; i < fullStars; i++) {
            starRating.push('★'); // Ký tự sao đầy
        }
        if (halfStar) {
            starRating.push('☆'); // Ký tự sao trống nếu có nửa sao
        }
        for (let i = 0; i < emptyStars; i++) {
            starRating.push('☆'); // Ký tự sao trống
        }

        return starRating.join(' '); // Chuyển mảng thành chuỗi
    }

    const rateIDArray = Array.isArray(product.rateID) ? product.rateID : [];
    const averageRating = calculateAverageRating(reviews);
    const starRating = convertToStarRating(averageRating);

    //Post review

    // Thực hiện GET request để lấy ID từ API
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
            // Bước 3: Lấy ID từ dữ liệu API
            var userID = user.id;
            console.log(user.id,);
        })
        .catch((error) => {
            console.error(error);
            // Xử lý lỗi nếu có
        });


    const postReview = () => {
        // Lấy thông tin người dùng hiện tại từ localStorage
        const encryptedProfile = localStorage.getItem('profile');
        if (encryptedProfile) {
            const decryptedProfile = decodeData(encryptedProfile);
            const profile = JSON.parse(decryptedProfile);
            const userEmail = profile.email;

            // Lấy thông tin người dùng từ API bằng email
            fetch(`http://localhost:3000/googleAccount?email=${userEmail}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to retrieve user data from the API.');
                    }
                })
                .then((userData) => {
                    const javascriptUserID = userData[0].id;

                    // Kiểm tra xem người dùng đã đăng đánh giá cho khóa học này chưa
                    const hasUserReviewed = reviews.some(
                        (review) => review.courseID === parseInt(id) && review.userID === javascriptUserID
                    );

                    if (hasUserReviewed) {
                        // Nếu người dùng đã đánh giá cho khóa học này, thông báo lỗi
                        notification.warning({
                            message: 'Lỗi',
                            description: 'Bạn đã đăng đánh giá cho khóa học này rồi.',
                            placement: 'topRight',
                        });
                    } else if (!review.rating || review.rating === 0) {
                        notification.error({
                            message: 'Lỗi',
                            description: 'Bạn chưa lựa chọn số rate.',
                            placement: 'topRight',
                        });
                    } else if (!review.comment) {
                        notification.error({
                            message: 'Lỗi',
                            description: 'Bạn chưa nhập comment.',
                            placement: 'topRight',
                        });
                    } else {
                        // Nếu không có lỗi và người dùng chưa đánh giá, tiến hành đăng đánh giá
                        const currentDate = moment().tz('Asia/Ho_Chi_Minh');
                        const formattedDate = currentDate.format('YYYY-MM-DD');

                        const dataToPost = {
                            rating: review.rating,
                            comment: review.comment,
                            userID: javascriptUserID,
                            courseID: parseInt(id), // Chuyển đổi id thành số
                            date: formattedDate,
                        };

                        axios
                            .post('http://localhost:3000/Reviews', dataToPost)
                            .then((response) => {
                                console.log('Đánh giá đã được đăng thành công', response.data);

                                // Cập nhật danh sách đánh giá sau khi gửi thành công
                                setReviews([...reviews, dataToPost]);

                                // Đặt lại giá trị mặc định cho form đánh giá
                                setReview({ rating: 0, comment: '' });
                            })
                            .catch((error) => {
                                console.error('Lỗi khi đăng đánh giá', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi kiểm tra thông tin người dùng', error);
                });
        }
    };

    const timelineItems = videos.map((video) => ({
        color: 'green',
        children: (
            <div key={video.id}>
                {video.videoTitle}
            </div>
        ),
    }));

    timelineItems.push(
        {
            color: '#00CCFF',
            dot: <SmileOutlined />,
            children: <p>Certificate</p>,
        }
    );

    const [userReviews, setUserReviews] = useState<any[]>([]);

    useEffect(() => {
        // Lấy danh sách đánh giá của người dùng từ API
        axios.get(`http://localhost:3000/Reviews?userID=${userEmail}&courseID=${id}`)
            .then((response) => {
                setUserReviews(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userEmail, id]);
    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="containerCss">
            <div className="course-header-container">
                <div className="course-overview-header">
                    <div className="courseLeft">
                        <a className='courseLeft-ah1' href="">{product.courseName}</a>
                        <div className="course-span-left mt-3">
                            <span>product.level</span>
                            <span className='mb-1 font-bold'>.</span>
                            <span>{product.duration} m</span>
                            <span className='mb-1 font-bold'>.</span>
                            <span>Released: {product.date}</span>
                        </div>
                        <div className="course-span-leftx">
                            <div className='mt-1'>{averageRating}</div>
                            <div className='starrev' id="starRating">{starRating}</div>
                            <div className='mt-1'>(240)</div>
                            <div className='mt-1'><span>{product.enrollment} learners</span></div>
                        </div>
                        <div className='flex gap-4 intro-bt'>
                            <Link to={`/content/${id}`}>
                                <button className='intro-bt1'>Start my free month</button>
                            </Link>
                            <button className='intro-bt2' onClick={handleBuyButtonClick}>Buy for my team</button>
                        </div>
                    </div>

                    <div className="courseRight">
                        <button><i className="fa-solid fa-play"></i> Preview</button>
                    </div>
                </div>
            </div>
            <div className="imgHid">
                <img src={product.courseIMG} alt="" />
            </div>
            <hr />
            <div className="flex">
                <div className="course-body-intro">
                    <span className='course-intro-sp1'>WHAT’S INCLUDED</span>
                    <div className="included-phone">
                        <div><i className="fa-solid fa-mobile-screen ml-1"></i> Access on tablet and phone</div>
                        <div><i className="fa-regular fa-newspaper"></i>Certificate of completion</div>
                    </div>
                    <div className="courseDescription">
                        <div className="titleCourseDescription">Course description</div>
                        <p>{product.description}</p>
                    </div>
                    <div className="courseDescription">
                        <div className="titleCourseDescription">Shareable certificate</div>
                        <img width={250} className='mt-3' src="https://f11-zpcloud.zdn.vn/8468826104549191620/bb5b8481eb753c2b6564.jpg" alt="" />
                        <div className='font-medium text-xl mt-6'>
                            Instructors
                        </div>
                        <div className="instructors">
                            <div className="instructors-children">
                                <div className="instruc-left">
                                    <img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.15752-9/383292251_829901122012637_7869564018659041068_n.png?_nc_cat=101&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=isJ5azOlmdMAX9kwwJD&_nc_ht=scontent.fhan2-3.fna&_nc_e2o=s&oh=03_AdSeeh6rPRQcy3YfM7RB0VudMtnM-g0IMmvF76DjiEjJtg&oe=655208E8" alt="" />
                                </div>
                                <div className="instruc-right">
                                    <h1>Trần Thị Hương Trà</h1>
                                    <h2>Microsoft</h2>
                                    <h3><a href="">View more courses by Hương Trà</a></h3>
                                </div>
                            </div>
                        </div>
                        <div className='font-medium text-xl mt-6'>
                            Learner reviews
                        </div>
                        <div className="flex">
                            <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                                <div className="p-6">
                                    <div className="flex items-center gap-2">

                                        <div className='preview'>
                                            <div className='mt-4'> <span><span className='text-4xl font-bold text-black'>{calculateAverageRating(reviews)}</span> out 5</span></div>
                                            <div className="flex items-center gap-2">
                                                <div className="mt-3">
                                                    <span className="text-sm rounded text-slate-500 ">
                                                        <span className="flex gap-1 text-amber-400" role="img" aria-label="Rating: 4 out of 5 stars">
                                                            <div className='starrev' id="starRating">{starRating}</div>
                                                        </span>
                                                    </span>
                                                </div>

                                                <div className='mt-3'>
                                                    <span className="text-xs leading-6 text-slate-400">147 ratings</span>
                                                </div>
                                            </div>
                                        </div>

                                        <span className="flex flex-col w-full gap-4 pt-6">

                                            {/* Hiển thị biểu đồ thống kê ở đây */}
                                            {Object.keys(ratingCounts).map((rating) => (
                                                <span key={rating} className="flex items-center w-full gap-2">
                                                    <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> {rating} star</label>
                                                    <progress aria-labelledby="p03e-label" id="p03e" max="100" value="75" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400" max="100" value={(ratingCounts[parseInt(rating)] / reviews.length) * 100}> {(ratingCounts[parseInt(rating)] / reviews.length) * 100}%</progress>
                                                    <span className="text-xs font-bold w-9 text-slate-700">{ratingCounts[parseInt(rating)]}</span>
                                                </span>
                                            ))}

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {canDisplayForm && (
                            <Form className='mt-7 formReview' action="" method="post" >
                                <div className="gap-2">
                                    <div className='flex items-center gap-2'>
                                        <Rating className='flex text-yellow-400'
                                            value={review.rating}
                                            onChange={handleRatingChange}
                                        />
                                        <Typography className="font-medium mb-4 text-yellow-400">
                                            {rated}.0
                                        </Typography>
                                    </div>
                                    <Input
                                        value={review.comment}
                                        onChange={(e) => setReview({ ...review, comment: e.target.value })}
                                    />
                                    <Button className='mt-4' type='dashed' onClick={postReview}>Post</Button>
                                </div>
                            </Form>
                        )}
                        <div className="listReviewIntro">
                            {reviews.map((review) => (
                                <div key={review.id} className="reviewIntroChildren">
                                    <div className="avatarReview">
                                        <img src={findUserById(review.userID)?.avatarIMG} alt="" />
                                    </div>
                                    <div className="desReview">
                                        <div className="desrv1">{findUserById(review.userID)?.username}</div>
                                        <div className="desrv2">{review.comment}</div>
                                        <div className="flex items-center gap-10">
                                            <div>{renderReviewRateIcon(review.rating)}</div>
                                            <div className="desrv4">{review.date}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='introducation-right'>
                    <h2 className='text-xl font-medium p-3 mt-12 mb-5'>Introduction</h2>
                    <div>
                        <div className=' p-5'>
                            <Timeline items={timelineItems} />

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
                    <h2 className='text-xl font-medium p-3'>Related courses</h2>
                    <ul className="divide-y divide-slate-100">
                        {similarProducts.map((similarProduct) => (
                            <li key={similarProducts.id} className="flex items-start gap-4 px-4 py-3">
                                <div className="flex items-center shrink-0">
                                    <img src={similarProduct.courseIMG} alt="product image" className="w-32 rounded" />
                                </div>
                                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                                    <h4 className='text-xs'>COURSE</h4>
                                    <h4 className="text-base text-slate-700 font-medium">
                                        <Link to={`/introduction/${similarProduct.id}`}>
                                            <p className="mt-1 text-base">{similarProduct.courseName}</p> </Link></h4>
                                    <p className="w-full text-xs text-slate-500 mt-3">{similarProduct.enrollment} learners</p>
                                    <span className='timeforvideoIntro'>{similarProduct.duration} m</span>
                                </div>
                            </li>
                        ))}
                        <hr />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default IntroductionPage