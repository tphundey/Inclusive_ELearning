import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    const truncateProductName = (name: any, maxLength: any) => {
        return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
    };

    const [shuffledSimilarProducts, setShuffledSimilarProducts] = useState<any[]>([]);
    const shuffleArray = (array: any) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };
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
                    {renderedSimilarProducts}
                    <hr />
                </ul>
            </div>
        </div>
    )

};

export default OverViewPage;
