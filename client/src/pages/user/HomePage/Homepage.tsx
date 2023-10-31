import './HomePage.css'
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from "@/api/courses";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../components/FormatCurency/formatCurency';

const Homepage = () => {
    const { data: productsData, isLoading: isProductLoading } = useGetProductsQuery();
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const visibleProducts = productsData?.filter((product: any) => !product.isHidden);

    useEffect(() => {
        const fetchCategoryData = async () => {
            if (productsData) {
                const categoryPromises = productsData.map(async (product: any) => {
                    try {
                        const response = await fetch(`http://localhost:3000/Categories/${product.categoryID}`);
                        if (response.ok) {
                            const category = await response.json();
                            return category;
                        }
                    } catch (error) {
                        console.error('Error fetching category data:', error);
                    }
                    return null;
                });
                const categories = await Promise.all(categoryPromises);
                setCategoryData(categories.filter(category => category !== null));
            }
        };
        fetchCategoryData();
    }, [productsData]);


    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
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
                {/* <div className='rcm-1'>
                    <img src="https://f10-zpcloud.zdn.vn/5816977808189187612/c8dfdd3f757aa724fe6b.jpg" alt="" />
                </div>
                <div className='rcm-2'>
                    <div className="rcm2-1">Recommended</div>
                    <div className="rcm2-2">Hi, advance your career with personalized learning</div>
                    <div className="rcm2-3">Get custom skill and course recommendations based on your goals. Your response is private to you.</div>
                </div>
                <div className='rcm-3'>
                    <button>Get started</button>
                </div> */}
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
                            {isProductLoading ? (
                                <span className="loading loading-spinner text-info" style={{ display: "block", margin: "0 auto" }}></span>
                            ) : (
                                <Slider {...settings}>
                                    {visibleProducts?.map((product: any, index: any) => {
                                        const category = categoryData[index];
                                        const formattedPrice = formatCurrency(product.price);
                                        const categoryContent = category ? category.categoryName : (
                                            <span className="loading loading-spinner text-info" style={{ display: "block", margin: "0 auto" }}></span>
                                        );
                                        return (
                                            <div className="group relative">
                                                <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                    <img src={product.courseIMG} alt="" />
                                                </div>
                                                <div className="mt-2">
                                                    <div>
                                                        <h3 className="text-xs text-gray-700">
                                                            <span className="absolute inset-2 popular">COURSE</span>
                                                            {categoryContent}
                                                        </h3>
                                                        <a href={`/introduction/${product.id}`} key={index}>
                                                            <p className="mt-1 text-base">{product.courseName}</p>
                                                        </a>
                                                    </div>
                                                    <p className=" mt-1 text-xs text-gray">{formattedPrice}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
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
                            {isProductLoading ? (
                                <span className="loading loading-spinner text-info" style={{ display: "block", margin: "0 auto" }}></span>
                            ) : (
                                <Slider {...settings}>
                                    {productsData
                                        ?.filter((product: any) => !product.isDeleted)
                                        .map((product: any, index: any) => {
                                            const category = categoryData[index];
                                            const formattedPrice = formatCurrency(product.price);
                                            const categoryContent = category ? category.categoryName : (
                                                <span className="loading loading-spinner text-info" style={{ display: "block", margin: "0 auto" }}></span>
                                            );
                                            return (
                                                <div className="group relative" key={index}>
                                                    <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide">
                                                        <img src={product.courseIMG} alt="" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <h3 className="text-xs text-gray-700">
                                                                <span className="absolute inset-2 popular">COURSE</span>
                                                                {categoryContent}
                                                            </h3>
                                                            <Link to={`/introduction/${product._id}`}>
                                                                <p className="mt-1 text-base">{product.courseName}</p>
                                                            </Link>
                                                        </div>
                                                        <p className="mt-1 text-xs text-gray">{formattedPrice}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                        .reverse()
                                    }
                                </Slider>
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