import '../BrowsePage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';

const Creativepage = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const fetchCourses = () => Axios.get('http://localhost:3000/Courses');
    const fetchCategories = () => Axios.get('http://localhost:3000/Categories');

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

    return (
        <div className="containerCss-browepage  business">
            <h2 className='h2-bsn'>Creative</h2>
            <br />
            <h2 className='h2-bsn2'>Role Guides</h2>
            <span className='sp1-bsn'>Explore foundational content and tools to help you understand, learn, and improve at the skills involved in trending industry roles.</span>
            <hr />

            <div className="listbsn">
                <div className="bsn-children">
                    <a href="">Project Manager</a>
                </div>
                <div className="bsn-children bg-yellow-200">
                    <a href="">Project Manager</a>
                </div>
                <div className="bsn-children bg-green-200">
                    <a href="">Project Manager</a>
                </div>
                <div className="bsn-children bg-lime-300">
                    <a href="">Project Manager</a>
                </div>
            </div>

            <div className="bsn-flex-h2">
                <div> <h2 className='h2-bsn2'>Learning Paths</h2></div>
                <div><a href="#" className='text-blue-800 font-medium show-all'>Show All</a></div>
            </div>
            <hr />
            <div className="product-slider2 business-slider">

                <Slider {...settings}>
                    {courses
                        .filter((course: any) => {
                            const category = categories.find((cat: any) => cat.id === course.categoryID);
                            return category && category.id === "6575b618f7bb58843117e0ed";
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
                <div className='list-softchi'><a href="">Photoshop</a></div>
                <div className='list-softchi'><a href="">Illustrator</a> </div>
                <div className='list-softchi'><a href="">InDesign</a></div>
                <div className='list-softchi'><a href="">Revit</a></div>
                <div className='list-softchi'><a href="">AutoCAD</a> </div>
                <div className='list-softchi'><a href="">SOLIDWORKS</a></div>
                <div className='list-softchi'><a href="">3ds Max</a></div>
                <div className='list-softchi'><a href="">SketchUp</a></div>
                <div className='list-softchi'><a href="">PowerPoint</a> </div>
                <div className='list-softchi'><a href="">Canva</a></div>
                <div className='list-softchi'><a href="">After Effects</a></div>
                <div className='list-softchi'><a href="">AutoCAD</a> </div>
                <div className='list-softchi'><a href="">SOLIDWORKS</a></div>
                <div className='list-softchi'><a href="">Premiere Pro</a></div>
            </div>
        </div>
    )
};

export default Creativepage;
