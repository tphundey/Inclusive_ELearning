import '../BrowsePage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';
import axios from 'axios';
const Businesspage = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const fetchCourses = () => Axios.get('http://localhost:3000/Courses');
    const fetchCategories = () => Axios.get('http://localhost:3000/Categories');
    const [categories2, setCategories2] = useState<any[]>([]);
    const [categories3, setCategories3] = useState<any[]>([]);
    const [mappedCategoryNames, setMappedCategoryNames] = useState<any[]>([]);
    const settings: any = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    useEffect(() => {
        fetchCourses()
            .then(response => setCourses(response.data))
            .catch(error => console.error(error));
        fetchCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/categories')
            .then(response => {
                setCategories2(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const categoryIdsToMap = ['6570915fe04745af0164e622', '6570916be04745af0164e625', '6571e7a4900b07f0abe9b752'];

    useEffect(() => {
        const mappedNames = categoryIdsToMap.map(categoryId => {
            const category = categories.find(c => c.id === categoryId);
            return category ? category.categoryName : 'Unknown Category';
        });

        setMappedCategoryNames(mappedNames);
    }, [categories2]);

    useEffect(() => {
        // Fetch categories from your API
        axios.get('http://localhost:3000/categories')
            .then(response => {
                setCategories3(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const renderCategories = () => {
        return categories3.map(category => (
            <div key={category.id}>
                <div className='list-softchi'><a href="">{category.categoryName}</a></div>
            </div>
        ));
    };
    return (
        <div className="containerCss-browepage  business">
            <h2 className='h2-bsn'>Business</h2>
            <br />
            <h2 className='h2-bsn2'>Role Guides</h2>
            <span className='sp1-bsn'>Explore foundational content and tools to help you understand, learn, and improve at the skills involved in trending industry roles.</span>
            <hr />

            <div className="listbsn">
                {mappedCategoryNames.map((name, index) => (
                    <div key={index} className="bsn-children">
                        <a href="">{name}</a>
                    </div>
                ))}

            </div>

            <div className="bsn-flex-h2">
                <div> <h2 className='h2-bsn2'>Learning Paths</h2></div>
                <div><a href="http://localhost:5173/listcourse/6570bb822c2775b9466373fd" className='text-blue-800 font-medium show-all'>Show All</a></div>
            </div>
            <hr />
            <div className="product-slider2 business-slider">

                <Slider {...settings}>
                    {courses
                        .filter((course: any) => {
                            const category = categories.find((cat: any) => cat.id === course.categoryID);
                            return category && category.id === "6570915fe04745af0164e622";
                        })
                        .map((course: any, index: number) => (

                            <div key={index} className="group relative">
                                <div className="aspect-h-1 product-hp aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 product-slide2">
                                    <img src={course.courseIMG} alt="" />
                                </div>
                                <div className="mt-2">
                                    <div>
                                        <h3 className="text-xs text-gray-700">
                                            <a href="#">
                                                <span className="absolute inset-2 popular">POPULAR</span>
                                                Admin
                                            </a>
                                        </h3>
                                        <a href={`/introduction/${course.id}`} key={index}>
                                            <p className="mt-1 text-sm">{course.courseName}</p>
                                        </a>
                                    </div>
                                    <p className=" mt-1 text-xs text-gray">{formatCurrency(course.price)}</p>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>

            <h2 className='h2-bsn2'>Software</h2>
            <hr />
            <div className="list-software">
                {renderCategories()}

            </div>
        </div>
    )
};

export default Businesspage;
