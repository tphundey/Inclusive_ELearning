import './BrowsePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Slider } from 'antd';
const ListCourse = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const fetchCourses = () => Axios.get('http://localhost:3000/Courses');
    const fetchCategories = () => Axios.get('http://localhost:3000/Categories');
    const [categories2, setCategories2] = useState<any[]>([]);
    const [categories3, setCategories3] = useState<any[]>([]);
    const [mappedCategoryNames, setMappedCategoryNames] = useState<any[]>([]);
    const [visibleCourses, setVisibleCourses] = useState(4); // Initially show 4 courses
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    const [durationRange, setDurationRange] = useState([0, 100]); // Default duration range in minutes
    const { id } = useParams();
    console.log(id);

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
        axios.get('http://localhost:3000/categories')
            .then(response => {
                setCategories3(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    const handleShowMore = () => {
        // Increase the visibleCourses count by 4
        setVisibleCourses(prevVisibleCourses => prevVisibleCourses + 4);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        filterCoursesByPrice(value);
    };

    const filterCoursesByPrice = (range) => {
        const filtered = courses.filter(course => course.price >= range[0] && course.price <= range[1]);
        setFilteredCourses(filtered);
    };
    const handleDurationChange = (value) => {
        setDurationRange(value);
        filterCourses();
    };

    const filterCourses = () => {
        const filtered = courses.filter(
            course => course.price >= priceRange[0] && course.price <= priceRange[1]
                && course.duration >= durationRange[0] && course.duration <= durationRange[1]
        );
        setFilteredCourses(filtered);
    };
    useEffect(() => {
        Axios.get('http://localhost:3000/Courses')
            .then(response => {
                // Filter courses based on categoryID
                const filteredCourses = response.data.filter(course => course.categoryID === id);
                console.log(filteredCourses);

                // Set the filtered courses to state
                setCourses(filteredCourses);
            })
            .catch(error => console.error(error));
    }, []);

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
        const handleCategoryClick = (categoryId) => {
            window.location.href = `http://localhost:5173/listcourse/${categoryId}`;
        };

        return categories3.map(category => (
            <div key={category.id} className="bsn-children">
                <a
                    href="#"
                    onClick={() => handleCategoryClick(category.id)}
                >
                    {category.categoryName}
                </a>
            </div>
        ));
    };
    return (
        <div className="containerCss-browepage2  business mt-3">
            <h2 className='h2-bsn'>List course</h2>
            <div>
                <h3>Price Range: (vnd)</h3>
                <Slider
                    range
                    min={0}
                    max={1000000}
                    defaultValue={[0, 1000]}
                    onChange={handlePriceChange}
                />
            </div>
            <div>
                <h3>Duration Range: (m)</h3>
                <Slider
                    range
                    min={0}
                    max={3000}
                    defaultValue={[0, 1000]}
                    onChange={handleDurationChange}
                />
            </div>
            <br />
            <h2 className='h2-bsn2'>Role Guides</h2>
            <span className='sp1-bsn'>Explore foundational content and tools to help you understand, learn, and improve at the skills involved in trending industry roles.</span>
            <hr />


            <div className="listbsn">
                {renderCategories()}

            </div>
            <div className="bsn-flex-h2">
                <div> <h2 className='h2-bsn2'>Learning Paths</h2></div>
            </div>
            <hr />

            <div className="listpro-one">
                {filteredCourses.map((course) => (
                    <div key={course.id}>
                        <div className='ty-contai'>
                            {/* Hiển thị thông tin khóa học */}
                            <div className="courseProgress">
                                <div className="imgCoureProgress">
                                    <img src={course.courseIMG} alt="" />
                                </div>
                                <div className="infoCourseProgress">
                                    <h3>COURSE</h3>
                                    <a href={`/introduction/${course.id}`}>
                                        <h2>{course.courseName}</h2>
                                    </a>
                                    <div className='mt-4'>{formatCurrency(course.price)}</div>
                                    <div className="fl-info-progress mt-2">
                                        <div className="fl1-info-progress">
                                            <img
                                                className='mt-1'
                                                src="https://f63-zpg-r.zdn.vn/4940067705430501247/8f148f0e98874fd91696.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="fl2-info-progress">LinkedIn - By: Trần Phùng</div>
                                    </div>
                                </div>
                            </div>
                            <div className="option-course-progress">
                                <div className="dropdown dropdown-right dropdown-end mt-5">
                                    <label tabIndex={0} className="btn m-1">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 right-0 mt-8"
                                    >
                                        {/* <li><a onClick={() => handleAddToCollections(course.id)}>Add to collections</a></li>
                                    <li><a onClick={() => handleMoveToHistory(course.id)}>Move to history</a></li>
                                    <li><a onClick={() => handleRemoveCourse(course.id)}>Remove</a></li>  */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
                {courses.length > visibleCourses && (
                    <button className="show-more-button font-bold" onClick={handleShowMore}>
                        Show More
                    </button>
                )}
            </div>


        </div>
    )
};

export default ListCourse;
