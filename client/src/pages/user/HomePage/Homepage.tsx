import './HomePage.css';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from "@/api/courses";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatCurrency } from '../../../components/FormatCurency/formatCurency';
import { Spin } from 'antd';

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
    const [loading, setLoading] = useState(false);
    const { data: productsData } = useGetProductsQuery();
    const [visibleProducts, setVisibleProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Bắt đầu loading

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
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Kết thúc loading dù có lỗi hay không
            }
        };

        fetchData();
    }, [productsData]);

    const [visibleProducts2, setVisibleProducts2] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            if (productsData) {
                const updatedVisibleProducts = await Promise.all(
                    productsData.map(async (product) => {
                        const categoryName = await fetchCategoryData(product.categoryID);

                        // Kiểm tra trường isHidden
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
                    <h2 className='text-3xl'>Hi, grow your skills and advance your career with LinkedIn Learning</h2>
                    <div className="fl-milion">
                        <span className='flex gap-1'><img src="https://f10-zpcloud.zdn.vn/8154582047521615141/d3ef92e85e708b2ed261.jpg" alt="" /><img src="https://static.licdn.com/aero-v1/sc/h/9kb0uzaajhypnqmj6ucmdlrfe" alt="" /></span>
                        <span>Millions of members are on LinkedIn Learning</span>
                    </div>
                    <div className="fl-button">
                        <button className="btn btn-active btn-ghost">Start your progress</button>
                        <button className="btn btn-outline btn-accent">Buy for my team</button>
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
                    <pre data-prefix="$"><code>npm i Recommended</code></pre>
                    <pre data-prefix=">" className="text-warning"><code>Hi, advance your career with personalized learning...</code></pre>
                    <pre data-prefix=">" className="text-success"><code>Get custom skill and course recommendations based on your goals. Your response is private to you!</code></pre>
                </div>
            </div>

            <div>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Top picks for you</h2>

                        <div className="product-slider">
                            {loading ? (
                                <Spin size="large" />
                            ) : (
                                <>
                                    <Slider {...settings}>
                                        {visibleProducts?.map((product: any, index: any) => {

                                            const formattedPrice = formatCurrency(product.price);

                                            return (
                                                <div className="group relative">
                                                    <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                        <img src={product.courseIMG} alt="" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <h3 className="text-xs text-gray-700">
                                                                <span className="absolute inset-2 popular">COURSE</span>
                                                                {product.categoryName}
                                                            </h3>
                                                            <a href={`/introduction/${product.id}`} key={index}>
                                                                <p className="mt-1 text-base">{product.courseName.substring(0, 70)}...</p>
                                                            </a>
                                                        </div>
                                                        <p className=" mt-1 text-xs text-gray">{formattedPrice}</p>
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
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">This week’s top courses</h2>

                        <div className="product-slider">
                            {loading ? (
                                <Spin size="large" />
                            ) : (
                                <>
                                    <Slider {...settings}>
                                        {visibleProducts2?.map((product: any, index: any) => {

                                            const formattedPrice = formatCurrency(product.price);

                                            return (
                                                <div className="group relative">
                                                    <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                        <img src={product.courseIMG} alt="" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <h3 className="text-xs text-gray-700">
                                                                <span className="absolute inset-2 popular">COURSE</span>
                                                                {product.categoryName}
                                                            </h3>
                                                            <a href={`/introduction/${product.id}`} key={index}>
                                                                <p className="mt-1 text-base">{product.courseName.substring(0, 70)}...</p>
                                                            </a>
                                                        </div>
                                                        <p className=" mt-1 text-xs text-gray">{formattedPrice}</p>
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