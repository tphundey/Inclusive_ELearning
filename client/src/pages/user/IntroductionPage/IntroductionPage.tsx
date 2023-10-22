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
import { Alert } from 'antd';
import { message } from 'antd';
import { notification } from 'antd';

// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

const IntroductionPage = () => {
    const [rated, setRated] = React.useState(4);
    const [product, setProduct] = useState<any>({});
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [review, setReview] = useState({ rating: 4, comment: '' });
    const [users, setUsers] = useState<any[]>([]);
    const { id } = useParams();
    const [, setEncryptedData] = useState<any>(null);
    const courseID = parseInt(id, 10);

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
                console.log(user.id,);

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

    const postReview = () => {
        if (!review.rating || review.rating === 0) {
            notification.error({
                message: 'Lỗi',
                description: 'Bạn chưa lựa chọn số rate.',
                placement: 'topRight', // Chọn vị trí bạn muốn
            });
            return;
        }

        if (!review.comment) {
            notification.error({
                message: 'Lỗi',
                description: 'Bạn chưa nhập comment.',
                placement: 'topRight', // Chọn vị trí bạn muốn
            });
            return;
        }

        const currentDate = moment().tz('Asia/Ho_Chi_Minh'); // Lấy thời gian theo múi giờ Việt Nam
        const formattedDate = currentDate.format('YYYY-MM-DD'); // Định dạng lại ngày

        const dataToPost = {
            rating: review.rating,
            comment: review.comment,
            userID: 1,
            courseID: product.id, // Bạn cần đảm bảo product được định nghĩa ở đây
            date: formattedDate,
        };

        axios.post('http://localhost:3000/Reviews', dataToPost)
            .then((response) => {
                // Xử lý kết quả ở đây nếu cần
                console.log('Đánh giá đã được đăng thành công', response.data);

                // Cập nhật danh sách đánh giá sau khi gửi thành công
                setReviews([...reviews, dataToPost]);

                // Đặt lại giá trị mặc định cho form đánh giá
                setReview({ rating: 0, comment: '' });
            })
            .catch((error) => {
                // Xử lý lỗi ở đây nếu có
                console.error('Lỗi khi đăng đánh giá', error);
            });
    };

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
                        <div className="certificate mt-4" >
                            <div className="certiLeft">
                                <img src="https://static.licdn.com/aero-v1/sc/h/35xqn2j8lu3c1pgwy1r6hrdoj" alt="" />
                            </div>
                            <div className="certiRight">
                                <img src="https://f10-zpcloud.zdn.vn/1128982520427566380/4fb638b9f0c1229f7bd0.jpg" alt="" />
                                <div className='font-medium'>
                                    Certificate of Completion
                                </div>
                                <div>
                                    <ul>
                                        <li> <i className="fa-solid fa-check"></i>Showcase on your LinkedIn profile under the "Licenses and Certificates" section</li>
                                        <li><i className="fa-solid fa-check"></i>Download or print out as PDF to share with others</li>
                                        <li><i className="fa-solid fa-check"></i>Share as image online to demonstrate your skill</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
                                            <span className="flex items-center w-full gap-2">
                                                <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 5 star</label>
                                                <progress aria-labelledby="p03e-label" id="p03e" max="100" value="75" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                                <span className="text-xs font-bold w-9 text-slate-700">112 </span>
                                            </span>
                                            <span className="flex items-center w-full gap-2">
                                                <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 4 star</label>
                                                <progress aria-labelledby="p03e-label" id="p03e" max="100" value="28" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                                <span className="text-xs font-bold w-9 text-slate-700">17 </span>
                                            </span>
                                            <span className="flex items-center w-full gap-2">
                                                <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 3 star</label>
                                                <progress aria-labelledby="p03e-label" id="p03e" max="100" value="18" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                                <span className="text-xs font-bold w-9 text-slate-700">12 </span>
                                            </span>
                                            <span className="flex items-center w-full gap-2">
                                                <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 2 star</label>
                                                <progress aria-labelledby="p03e-label" id="p03e" max="100" value="8" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                                <span className="text-xs font-bold w-9 text-slate-700">2 </span>
                                            </span>
                                            <span className="flex items-center w-full gap-2">
                                                <label id="p03e-label" className="mb-0 text-xs text-center w-9 shrink-0 text-slate-500"> 1 star</label>
                                                <progress aria-labelledby="p03e-label" id="p03e" max="100" value="10" className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400">75%</progress>
                                                <span className="text-xs font-bold w-9 text-slate-700">4 </span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <h2 className='text-xl font-medium p-3 mt-5'>Related courses</h2>

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