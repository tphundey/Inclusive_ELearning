import { useParams } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
                                <img src='https://avatars.githubusercontent.com/u/140551332?s=64&v=4' alt="" />
                            </div>
                            <div className="instruc-right">
                                <h1>Trần Phùng</h1>
                                <h2>Fpoly</h2>
                                <h3><a href="https://github.com/tphun999">Follow on Github</a></h3>
                            </div>
                        </div>
                    </div>

                    {/* 
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
                    </div> */}
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
