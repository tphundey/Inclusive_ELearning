import './BrowsePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { formatCurrency } from '@/components/FormatCurency/formatCurency';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Slider, message } from 'antd';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ListCourse = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const fetchCourses = () => Axios.get('http://localhost:3000/Courses');
    const fetchCategories = () => Axios.get('http://localhost:3000/Categories');
    const [categories2, setCategories2] = useState<any[]>([]);
    const [categories3, setCategories3] = useState<any[]>([]);
    const [mappedCategoryNames, setMappedCategoryNames] = useState<any[]>([]);
    const [visibleCourses, setVisibleCourses] = useState(4);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    const [userEmail, setuserEmail] = useState<any | null>(null);
    const [durationRange, setDurationRange] = useState([0, 100]);
    const { id } = useParams();
    const [selectedCategoryName, setSelectedCategoryName] = useState("")
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setuserEmail(currentUser?.email)
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

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
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/categories/${id}`)
                .then(response => {
                    const category = response.data;
                    setSelectedCategoryName(category.categoryName);
                })
                .catch(error => {
                    console.error('Error fetching category:', error);
                });
        }
    }, [id]);
    const handleBookmarkClick = (courseId) => {
        // Bước 1: Lấy thông tin người dùng từ API
        fetch(`http://localhost:3000/googleAccount?email=${userEmail}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to retrieve user data from the API.');
                }
            })
            .then((userData) => {
                const user = userData[0]; // Lấy người dùng đầu tiên, bạn có thể xác định người dùng một cách cụ thể

                // Bước 2: Lấy danh sách khóa học đã lưu của người dùng
                const savedCourses = user.courseSaved || []; // Danh sách khóa học đã lưu
                console.log(savedCourses, 'khoa hoc luu');

                // Kiểm tra xem courseID đã tồn tại trong danh sách đã lưu chưa
                if (!savedCourses.includes(courseId)) {
                    // Nếu chưa tồn tại, thêm courseID vào danh sách đã lưu
                    savedCourses.push(courseId);

                    // Bước 3: Cập nhật danh sách khóa học đã lưu của người dùng
                    user.courseSaved = savedCourses;

                    fetch(`http://localhost:3000/googleAccount/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    })
                        .then((updateResponse) => {
                            if (updateResponse.ok) {
                                message.success('Lưu khóa học thành công !');
                            } else {
                                throw new Error('Failed to update user data.');
                            }
                        })
                        .catch((updateError) => {
                            console.error('Error updating user data:', updateError);
                            message.error('Failed to update user data.');
                        });
                } else {
                    console.log('Khóa học đã được lưu.');
                    message.error('Khóa học đã được lưu.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <div className="containerCss-browepage2  business mt-3">
            <Button className='w-auto p-4 h-14 font-bold text-xl bg-blue-500 text-white mb-3'>{selectedCategoryName}</Button>
            <div>
                <h3>Giá tiền: (vnd)</h3>
                <Slider
                    range
                    min={0}
                    max={1000000}
                    defaultValue={[0, 100000]}
                    onChange={handlePriceChange}
                />
            </div>
            <div>
                <h3>Thời lượng: (m)</h3>
                <Slider
                    range
                    min={0}
                    max={200}
                    defaultValue={[0, 100]}
                    onChange={handleDurationChange}
                />
            </div>
            <br />
            <h2 className='h2-bsn2'>Các khóa học khác</h2>
            <span className='sp1-bsn'>Nhấn vào một danh mục và chọn thời lượng cũng như là giá tiền để chúng tôi có thể tìm kiếm giúp bạn khóa học phù hợp</span>
            <hr />


            <div className="listbsn">
                {renderCategories()}

            </div>
            <div className="bsn-flex-h2">
                <div> <h2 className='h2-bsn2'>Khóa học phù hợp</h2></div>
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
                                    <h3>Khóa học</h3>
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
                                        <Button onClick={() => handleBookmarkClick(course.id)}>Lưu khóa học</Button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
                {courses.length > visibleCourses && (
                    <button className="show-more-button font-bold" onClick={handleShowMore}>
                        Xem thêm
                    </button>
                )}
            </div>


        </div>
    )
};

export default ListCourse;
