import './HomePage.css';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from "@/api/courses";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatCurrency } from '../../../components/FormatCurency/formatCurency';

const fetchCategoryData = async (productId: number): Promise<string | null> => {
    try {
        const response = await fetch(`http://localhost:3000/categories/${productId}`);
        if (response.ok) {
            const category = await response.json();
            return category.categoryName;
        } else {
            console.error('Error fetching category data:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
};

const Homepage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { data: productsData } = useGetProductsQuery();
    const [visibleProducts, setVisibleProducts] = useState<any[]>([]);
    const [visibleProducts2, setVisibleProducts2] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (productsData) {
                    const updatedVisibleProducts = await Promise.all(
                        productsData.map(async (product) => {
                            const categoryName = await fetchCategoryData(product.categoryID);
                            if (!product.isHidden) {
                                return { ...product, categoryName };
                            } else {
                                return null;
                            }
                        })
                    );
                    const filteredVisibleProducts = updatedVisibleProducts.filter(product => product !== null);
                    setVisibleProducts(filteredVisibleProducts);
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, [productsData]);



    useEffect(() => {
        const fetchData = async () => {
            if (productsData) {
                const updatedVisibleProducts = await Promise.all(
                    productsData.map(async (product) => {
                        const categoryName = await fetchCategoryData(product.categoryID);
                        if (!product.isHidden) {
                            return { ...product, categoryName };
                        } else {
                            return null;
                        }
                    })
                );
                const filteredVisibleProducts = updatedVisibleProducts.filter(product => product !== null);
                const shuffledProducts = shuffleArray(filteredVisibleProducts);
                setVisibleProducts2(shuffledProducts);
                setLoading(false)
            }
        };
        fetchData();
    }, [productsData]);

    const shuffleArray = (array: any[]) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    return (
        <div className='homepage containerCss'>
            <div className="height-banner">
                <div className="banner">
                    <h2 className='text-3xl'>Xin chào, Trang web này có thể giúp các bạn học thêm nhiều kĩ năng cũng như kiến thức</h2>
                    <div className="fl-milion">
                        <span className='flex gap-1'><img src="https://f10-zpcloud.zdn.vn/8154582047521615141/d3ef92e85e708b2ed261.jpg" alt="" /><img src="https://static.licdn.com/aero-v1/sc/h/9kb0uzaajhypnqmj6ucmdlrfe" alt="" /></span>
                        <span>Đã có rất nhiều người sử dụng trang web học trực tuyến LinkedIn Learning</span>
                    </div>
                    <div className="fl-button">
                        <button className="btn btn-active btn-ghost">Bắt đầu học trực tuyến</button>
                        <button className="btn btn-outline btn-accent">Những bài học nâng cao kĩ năng </button>
                    </div>
                </div>
                <div className="bannerBosu">
                    <div className="bannerImg">
                        <img src="https://static.licdn.com/aero-v1/sc/h/cch95u9n3wpbme2zzh5n4uwg0" alt="" />
                    </div>
                </div>
            </div>

            <div className='Recommended-hp'>
                <div className="mockup-code w-full">
                    <pre data-prefix="$"><code>Nên dùng npm i! </code></pre>
                    <pre data-prefix=">" className="text-warning"><code>Xin chào, Bạn có thể học tập một cách cá nhân để nâng cao kiến thức</code></pre>
                    <pre data-prefix=">" className="text-success"><code>Bạn có thể tự chọn các khóa học thêm kiến thức hoặc kỹ năng sống. Mục này sẽ chỉ riêng bạn biết!</code></pre>
                </div>
            </div>

            <div>
                <div>
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Khóa học dành cho bạn</h2>

                        <div className="product-slider">
                            {loading ? (
                                <span className="loading loading-spinner text-info home-loading"></span>
                            ) : (
                                <>
                                    <Slider {...settings}>
                                        {visibleProducts?.map((product: any, index: any) => {
                                            const formattedPrice = product.price !== 0 ? formatCurrency(product.price) : 'Free';
                                            const textColorClass = product.price !== 0 ? 'text-blue-400' : 'text-green-500';
                                            return (
                                                <div className="group relative">
                                                    <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                        <img src={product.courseIMG} alt="" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <h3 className="text-xs text-gray-700">
                                                                <span className="absolute inset-2 popular">Khóa học</span>
                                                                {product.categoryName}
                                                            </h3>
                                                            <a href={`/introduction/${product.id}`} key={index}>
                                                                <p className="mt-1 text-base">{product.courseName.substring(0, 70)}...</p>
                                                            </a>
                                                        </div>
                                                        <p className={`mt-1 text-xs ${textColorClass}`}>{formattedPrice}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </Slider>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Khóa học nổi bật trong tuần</h2>

                        <div className="product-slider">
                            {loading ? (
                                <span className="loading loading-spinner text-info home-loading"></span>
                            ) : (
                                <>
                                    <Slider {...settings}>
                                        {visibleProducts2?.map((product: any, index: any) => {
                                            const formattedPrice = product.price !== 0 ? formatCurrency(product.price) : 'Free';
                                            const textColorClass = product.price !== 0 ? 'text-blue-400' : 'text-green-500';
                                            return (
                                                <div className="group relative">
                                                    <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                        <img src={product.courseIMG} alt="" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <h3 className="text-xs text-gray-700">
                                                                <span className="absolute inset-2 popular">Khóa học</span>
                                                                {product.categoryName}
                                                            </h3>
                                                            <a href={`/introduction/${product.id}`} key={index}>
                                                                <p className="mt-1 text-base">{product.courseName.substring(0, 70)}...</p>
                                                            </a>
                                                        </div>
                                                        <p className={`mt-1 text-xs ${textColorClass}`}>{formattedPrice}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </Slider>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-20' />
            {/* End */}
        </div>
    )

};

export default Homepage;