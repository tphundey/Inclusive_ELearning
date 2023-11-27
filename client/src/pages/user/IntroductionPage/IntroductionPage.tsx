import './introduction.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Input from 'antd/es/input/Input';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { Timeline, Form, Button, notification, Skeleton } from 'antd';
import { Rating, Typography } from "@material-tailwind/react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { renderReviewRateIcon } from '../../../components/RatingIcon/ratingIcons';
import { generateTimelineItems } from '@/components/TimeLineItem/TimeLineItem';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const IntroductionPage = () => {
    const [user, setUser] = useState<any | null>(null);
    const [userEmail, setuserEmail] = useState<any | null>(null);
    const [rated, setRated] = React.useState<number>(4);
    const [product, setProduct] = useState<any>({});
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [review, setReview] = useState({ rating: 4, comment: '' });
    const [users, setUsers] = useState<any[]>([]);
    const { id }: { id?: string } = useParams();
    const courseID: number | undefined = id ? parseInt(id, 10) : undefined;
    const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({});
    const [canDisplayForm, setCanDisplayForm] = useState<boolean>(false);
    const [userID, setUserID] = useState<number | null>(null);
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>('');
    const [currentVideo, setCurrentVideo] = useState<any>(null);
    const timelineItems = generateTimelineItems(videos);
    const [userReviews, setUserReviews] = useState<any[]>([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const handlePreviewClick = () => {
        setIsPreviewVisible(true);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setuserEmail(currentUser?.email)
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);


    ////////////////////Lấy thông tin khóa học (videos) theo ID////////////////////
    useEffect(() => {
        axios.get(`http://localhost:3000/Courses/${id}`)
            .then((response) => {
                const productData = response.data;
                setProduct(productData);
                axios.get(`http://localhost:3000/Videos`)
                    .then((videoResponse) => {
                        const allVideos = videoResponse.data;
                        const videoIdsInCourse = productData.videoID;
                        const filteredVideos = allVideos.filter((video: any) =>
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


    ///////////////////////// Láy thông tin danh mục///////////////////////////
    useEffect(() => {
        axios.get('http://localhost:3000/Categories')
            .then((response) => {
                if (response.status === 200) {
                    const categories = response.data;
                    const matchedCategory = categories.find((category: any) => category.id === product.categoryID);
                    if (matchedCategory) {
                        setCategoryName(matchedCategory.categoryName);
                        setLoading(false);
                    }
                }
            })
            .catch((error) => {
                console.error('Lỗi khi tải dữ liệu Categories:', error);
            });
    }, [product.categoryID]);


    ////////////////////Lấy thông tin tài khoản google dựa theo Email////////////////////
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
            const userID = user.id;
            setUserID(userID);

        })
        .catch((error) => {
            console.error(error);
        });


    ////////////////////Lấy thông tin thanh toán////////////////////
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/Payment`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the API.');
                }
                const data = await response.json();
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



    ////////////////////Lấy thông tin đánh giá ////////////////////
    useEffect(() => {
        axios.get(`http://localhost:3000/Reviews?courseID=${id}`)
            .then((response) => {
                console.log(response.data);
                setReviews(response.data);

            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);;


    ////////////////////Lấy thông tin số rate////////////////////
    useEffect(() => {
        const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((review) => {
            counts[review.rating] += 1;
        });
        setRatingCounts(counts);
    }, [reviews]);


    const handleBuyButtonClick = () => {
        const { price } = product;
        const paymentAmount = parseFloat(price);

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
                const userID = user.id;

                // Bước 2: Lấy danh sách khóa học đã mua của người dùng
                const registeredCourseIDs = user.registeredCourseID || []; // Danh sách khóa học đã mua

                // Thêm courseID vào danh sách đã mua nếu chưa tồn tại
                if (!registeredCourseIDs.includes(courseID)) {
                    registeredCourseIDs.push(courseID);
                }

                // Bước 3: Cập nhật danh sách khóa học đã mua của người dùng
                user.registeredCourseID = registeredCourseIDs;

                // Bước 4: Cập nhật dữ liệu người dùng sau khi thanh toán
                fetch(`http://localhost:3000/googleAccount/${userID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })
                    .then((updateResponse) => {
                        if (updateResponse.ok) {
                            console.log('User data updated successfully');
                        } else {
                            throw new Error('Failed to update user data.');
                        }
                    })
                    .catch((updateError) => {
                        console.error('Error updating user data:', updateError);
                    });

                // Bước 5: Thực hiện thanh toán
                const paymentData = {
                    userID,
                    courseID,
                    coupon: "null",
                    paymentAmount,
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
            .then((paymentResponse) => {
                if (paymentResponse.ok) {
                    console.log('Payment successful');
                    // Cập nhật trạng thái giao dịch hoặc thông báo cho người dùng
                } else {
                    throw new Error('Payment failed.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
            });
    };


    ////////////////////Thay đổi số rate////////////////////
    const handleRatingChange = (value: any) => {
        setReview({ ...review, rating: value });
        setRated(value);
    };
    useEffect(() => {
        if (id) {
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


    ////////////////////Lấy thông tin khóa học cùng loại///////////////////
    useEffect(() => {
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
        axios.get(`http://localhost:3000/Reviews?courseID=${id}`)
            .then((response) => {
                setReviews(response.data.reverse());
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get('http://localhost:3000/googleAccount')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);



    //////////////////// Lấy ra tổng số đánh giá///////////////////////
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Reviews?courseID=${id}`);
                const allReviews = response.data;
                setReviews(allReviews);
                const totalReviews = allReviews.length;
                setTotalReviews(totalReviews); // Cập nhật tổng số đánh giá

            } catch (error) {
                console.error(error);
            }
        };
        fetchReviews();
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
            starRating.push('★');
        }
        if (halfStar) {
            starRating.push('☆');
        }
        for (let i = 0; i < emptyStars; i++) {
            starRating.push('☆');
        }
        return starRating.join(' ');
    }

    const averageRating = calculateAverageRating(reviews);
    const starRating: string = convertToStarRating(averageRating.toString());


    const postReview = () => {
        if (userEmail) {
            // Lấy thông tin người dùng từ API bằng email
            fetch(`http://localhost:3000/googleAccount?email=${userEmail}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Lấy thông tin người dùng từ API thất bại.');
                    }
                })
                .then((userData) => {
                    const javascriptUserID = userData[0].id;

                    if (typeof id === 'string') {

                        const hasUserReviewed = reviews.some(
                            (review) => review.courseID === parseInt(id) && review.userID === javascriptUserID
                        );

                        if (hasUserReviewed) {
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

                            const currentDate = moment().tz('Asia/Ho_Chi_Minh');
                            const formattedDate = currentDate.format('YYYY-MM-DD');

                            const dataToPost = {
                                rating: review.rating,
                                comment: review.comment,
                                userID: javascriptUserID,
                                courseID: parseInt(id),
                                date: formattedDate,
                            };

                            axios
                                .post('http://localhost:3000/Reviews', dataToPost)
                                .then((response) => {
                                    console.log('Đánh giá đã được đăng thành công', response.data);
                                    setReviews([...reviews, dataToPost]);
                                    setRatingCounts((prevCounts) => {
                                        const updatedCounts = { ...prevCounts };
                                        updatedCounts[review.rating] = updatedCounts[review.rating] + 1;
                                        return updatedCounts;
                                    });
                                    setReview({ rating: 0, comment: '' });
                                })
                                .catch((error) => {
                                    console.error('Lỗi khi đăng đánh giá', error);
                                });
                        }
                    } else {
                        console.error('Lỗi: ID không phải là một chuỗi hợp lệ.');
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi kiểm tra thông tin người dùng', error);
                });
        } else {
            console.error('Lỗi: Email người dùng không được xác định.');
        }
    };



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


    ///////////////////////Tính số người tham gia khóa học/////////////////////////
    useEffect(() => {
        axios.get('http://localhost:3000/Payment')
            .then((response) => {
                if (response.status === 200) {
                    // Lấy danh sách payment từ response data
                    const payments = response.data;
                    // Tính tổng số lượng payment có courseID trùng với id
                    const count = payments.filter((payment: any) => payment.courseID === parseInt(id, 10)).length;
                    setPaymentCount(count);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi tải dữ liệu Payment:', error);
            });
    }, [id]);


    const [showFullDescription, setShowFullDescription] = useState(false);
    const maxLength = 500;
    const defaultDescription = product.description;
    const description = defaultDescription || '';
    const truncatedDescription = showFullDescription ? description : description.slice(0, maxLength) + '...';
    const truncateProductName = (name: any, maxLength: any) => {
        return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
    };

    const shuffleArray = (array: any) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };
    const [shuffledSimilarProducts, setShuffledSimilarProducts] = useState<any[]>([]);

    useEffect(() => {
        setShuffledSimilarProducts(shuffleArray(similarProducts));
    }, [similarProducts]);

    const renderedSimilarProducts = shuffledSimilarProducts.slice(0, 7).map((similarProduct: any) => (
        <li key={similarProduct.id} className="flex items-start gap-4 px-4 py-3">
            <div className="flex items-center shrink-0">
                <img src={similarProduct.courseIMG} alt="product image" className="w-32 rounded" />
            </div>
            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                <h4 className='text-xs'>COURSE</h4>
                <h4 className="text-base text-slate-700 font-medium">
                    <a href={`/introduction/${similarProduct.id}`}>
                        <p className="mt-1 text-base">{truncateProductName(similarProduct.courseName, 41)}</p>
                    </a>
                </h4>
                <p className="w-full text-xs text-slate-500 mt-3">{similarProduct.enrollment} learners</p>
                <span className='timeforvideoIntro'>{similarProduct.duration} m</span>
            </div>
        </li>
    ));

    if (loading) {
        return <Skeleton active />;
    }

    return (
        <div className="containerCss">
            <div className="course-header-container">
                <div className="course-overview-header">
                    <div className="courseLeft">
                        <a className='courseLeft-ah1' href="">{product.courseName}</a>
                        <div className="course-span-left mt-3">
                            <span>{categoryName}</span>
                            <span className='mb-1 font-bold'>.</span>
                            <span>{product.duration} m</span>
                            <span className='mb-1 font-bold'>.</span>
                            <span>Released: {product.date}</span>
                        </div>
                        <div className="course-span-leftx">
                            <div className='mt-1'>{averageRating}</div>
                            <div className='starrev' id="starRating">{starRating}</div>
                            <div className='mt-1'>({reviews.length})</div>
                            <div className='mt-1'><span>{paymentCount} learners</span></div>
                        </div>
                        <div className='flex gap-4 intro-bt'>
                            <Link to={`/content/${id}`}>
                                <button className='intro-bt1'>Start your progress</button>
                            </Link>
                            <button className='intro-bt2' onClick={handleBuyButtonClick}>Buy for my team</button>
                        </div>
                    </div>
                    <div className="courseRight">
                        {isPreviewVisible ? (
                            <div className="overlay">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/bh_iIIVIfW0?si=EN3YdY1xIRbuKCLg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                <button className='intro_close' onClick={() => setIsPreviewVisible(false)}>Close</button>
                            </div>
                        ) : (
                            <button className='intro_pre' onClick={handlePreviewClick}>Preview </button>
                        )}
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
                        <p>
                            {truncatedDescription}
                            {description.length > maxLength && (
                                <span onClick={() => setShowFullDescription(!showFullDescription)} style={{ color: 'blue', cursor: 'pointer' }}>
                                    {' '}
                                    {showFullDescription ? 'Thu gọn' : 'Xem tiếp'}
                                </span>
                            )}
                        </p>
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
                                    <img src="https://f10-zpcloud.zdn.vn/2458057547727804667/390dc301899a5cc4058b.jpg" alt="" />
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
                                                    <span className="text-xs leading-6 text-slate-400">{reviews.length} ratings</span>
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
                                        <img src={findUserById(review.userID)?.photoURL} alt="" />
                                    </div>
                                    <div className="desReview">
                                        <div className="desrv1">{findUserById(review.userID)?.displayName}</div>
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
                        </div>
                    </div>
                    <h2 className='text-xl font-medium p-3'>Related courses</h2>
                    <ul className="divide-y divide-slate-100">
                        {renderedSimilarProducts}
                        <hr />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default IntroductionPage