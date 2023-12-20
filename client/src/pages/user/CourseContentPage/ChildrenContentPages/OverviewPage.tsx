import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';
const OverViewPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/Courses/${id}`)
            .then((response) => {
                console.log(response.data);
                const productData = response.data;
                setProduct(productData);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);


    // ... other state variables ...

    useEffect(() => {
        // Fetch the main product
        axios.get(`http://localhost:3000/Courses/${id}`)
            .then((response) => {
                const productData = response.data;
                setProduct(productData);

                // Check if product has categoryID
                if (productData.categoryID) {
                    // Fetch all courses
                    axios.get(`http://localhost:3000/Courses`)
                        .then((allCoursesResponse) => {
                            // Filter courses with the same categoryID and exclude the current product
                            const filteredSimilarProducts = allCoursesResponse.data.filter(course => course.categoryID === productData.categoryID && course.id !== id);
                            setSimilarProducts(filteredSimilarProducts);
                        })
                        .catch((error) => {
                            console.error('Error fetching all courses:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    const truncateProductName = (name: any, maxLength: any) => {
        return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
    };

    const truncateDuration = (value: any) => {

        const isNumber = typeof value === 'number';
        const truncatedValue = isNumber ? value.toFixed(1) : parseFloat(value).toFixed(1);

        return truncatedValue;
    };

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

                        </div>
                    </div>
                </div>
                <div className="coursedetails">
                    <div className="text-xl font-medium mt-6">Chi tiết khóa học</div>

                    <div className="info-details">
                        <div className="info15">{truncateDuration(product.duration)} m</div>
                        <div><i className="fa-solid fa-circle"></i></div>
                        <div className="info15">Khóa học</div>
                        <div><i className="fa-solid fa-circle"></i></div>
                        <div className="info15">Ngày phát hành: {product.date}</div>
                    </div>

                    <div className="course-detail-main">
                     <b>Mô tả:</b>   {product.description}
                    </div>
                    <div className='font-medium text-xl mt-6'>
                        Tài liệu của khóa học
                    </div>
                    <div className="instructors">
                        <div className="instructors-children flex items-center">
                            <div className="instruc-left">
                                <img src='https://tse4.mm.bing.net/th?id=OIP.ZgeAS2PDvWQPHvgXNeSiCQHaEK&pid=Api&P=0&h=180' alt="" />
                            </div>
                            <div className="instruc-right">
                                {/* <h1>Trần Phùng</h1>
                                <h2>Fpoly</h2> */}
                                <div className='text-blue-700 font-bold'> <Link to={`/quizfor/${product.id}`}>Nhấn vào đây để làm bài tập</Link></div>
                                <h3> <a href={product.docs} target="_blank" rel="noopener noreferrer">Xem tài liệu khóa học</a></h3>
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
                    {similarProducts.slice(0, 7).map((similarProduct) => (
                        <li key={similarProduct.id} className="producsimi flex items-start gap-4 px-4 py-3">
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
                                <p className="w-full text-xs text-slate-500 mt-3"> {formatCurrency(similarProduct.price)}</p>
                                <span className='timeforvideoIntro  ml-1'>{truncateDuration(similarProduct.duration)} m</span>
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
