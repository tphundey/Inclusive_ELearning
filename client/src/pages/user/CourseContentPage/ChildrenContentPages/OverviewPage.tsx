import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function renderReviewRateIcon(reviewRate: number) {
    switch (reviewRate) {
        case 1:
            return (
                <div className="desrv3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                </div>
            );
        case 2:
            return (
                <div className="desrv3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                </div>

            );
        case 3:
            return (
                <div className="desrv3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                </div>
            );
        case 4:
            return (
                <div className="desrv3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                </div>
            );
        case 5:
            return (
                <div className="desrv3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                </div>
            );
        default:
            return null;
    }
}

const OverViewPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);

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
        // Lấy tất cả đánh giá từ API
        axios.get('http://localhost:3000/Reviews')
            .then((response) => {
                setReviews(response.data);
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
    }, []);

    function findUserById(userID) {
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



    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex gap-10 ">
            <div className="content-overview-left">
                <div className="content-structor mt-4">
                    INSTRUCTORS
                </div>
                <div className="content-structor-main">
                    <div className="content-structor-main-avatar">
                        <img src="https://f10-zpcloud.zdn.vn/8154582047521615141/d3ef92e85e708b2ed261.jpg" alt="" />
                    </div>
                    <div className="content-structor-main-name">
                        <div className="children-structor-main">
                            <div className='children-structor-main-name'>
                                Trần Phùng
                            </div>
                            <div>
                                <button>Show all course</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="coursedetails">
                    <div className="text-xl font-medium mt-6">Course details</div>
                    <div className="info-details">
                        <div className="info15">{product.duration} m</div>
                        <div><i className="fa-solid fa-circle"></i></div>
                        <div className="info15">Newbie</div>
                        <div><i className="fa-solid fa-circle"></i></div>
                        <div className="info15">Released: {product.date}</div>
                    </div>

                    <div className="course-detail-main">
                        {product.description}
                    </div>
                    <div className='font-medium text-xl mt-6'>
                        Instructors
                    </div>
                    <div className="instructors">
                        <div className="instructors-children">
                            <div className="instruc-left">
                                <img src='https://f10-zpcloud.zdn.vn/8154582047521615141/d3ef92e85e708b2ed261.jpg' alt="" />
                            </div>
                            <div className="instruc-right">
                                <h1>Trần Phùng</h1>
                                <h2>Fpoly</h2>
                                <h3><a href="https://github.com/tphun999">Follow on Github</a></h3>
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

                    <div className="listReviewIntro">
                        {rateIDArray.map((rateID) => {
                            // Lọc danh sách đánh giá có courseID trùng với rateID trong mảng
                            const relatedReviews = reviews.filter(
                                (review) => review.courseID === rateID
                            );

                            return relatedReviews.map((review) => (
                                <div key={review.id} className="reviewIntroChildren">
                                    <div className="avatarReview">
                                        <img src={findUserById(review.userID)?.avatarIMG} alt="" />
                                    </div>
                                    <div className="desReview">
                                        <div className="desrv1">{findUserById(review.userID)?.username}</div>
                                        <div className="desrv2">{review.reviewText}</div>
                                        <div className="flex items-center gap-10">
                                            <div>{renderReviewRateIcon(review.reviewRate)}</div>

                                            <div className="desrv4">{review.reviewTime}</div>
                                        </div>
                                    </div>
                                </div>
                            ));
                        })}
                    </div>
                    <br />
                </div>
            </div>
            <div className="content-overview-right">
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
    )

};

export default OverViewPage;
