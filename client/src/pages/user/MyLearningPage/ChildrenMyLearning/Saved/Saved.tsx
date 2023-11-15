import { useState, useEffect } from 'react';
import { Empty, Pagination } from 'antd';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp, FirebaseApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB1EWRdSA6tMWHHB-2nHwljjQIGDL_-x_E",
    authDomain: "course23-c0a29.firebaseapp.com",
    projectId: "course23-c0a29",
    storageBucket: "course23-c0a29.appspot.com",
    messagingSenderId: "1090440812389",
    appId: "1:1090440812389:web:e96b86b4d952f89c0d738c",
    measurementId: "G-51L48W6PCB"
};
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Saved = () => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [savedCourses, setSavedCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Thêm trạng thái trang hiện tại
 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setEmail(currentUser?.email)
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);

    useEffect(() => {
        fetch(`http://localhost:3000/googleAccount?email=${email}`)
            .then((response) => response.json())
            .then((userData) => {
                if (userData.length > 0) {
                    const user = userData[0];
                    const savedCourseIds = user.courseSaved;
                    fetch(`http://localhost:3000/Courses`)
                        .then((response) => response.json())
                        .then((coursesData) => {
                            const savedCourses = coursesData.filter((course: any) =>
                                savedCourseIds.includes(course.id)
                            );
                            setSavedCourses(savedCourses);
                        })
                        .catch((error) => {
                            console.error('Error fetching courses: ', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching user data: ', error);
            });
    }, [email]
    );


    const handleRemoveCourse = (courseId: any) => {
       

            fetch(`http://localhost:3000/googleAccount?email=${email}`)
                .then((response) => response.json())
                .then((userData) => {
                    if (userData.length > 0) {
                        const user = userData[0];
                        const registeredCourseIds = user.courseSaved;

                        // Loại bỏ courseId khỏi danh sách registeredCourseIds
                        const updatedRegisteredCourseIds = registeredCourseIds.filter((id:any) => id !== courseId);

                        // Tạo phiên bản mới của thông tin người dùng với trường registeredCourseID đã cập nhật
                        const updatedUserData = { ...user, courseSaved: updatedRegisteredCourseIds };

                        // Gửi yêu cầu PUT hoặc PATCH để cập nhật thông tin người dùng
                        fetch(`http://localhost:3000/googleAccount/${user.id}`, {
                            method: 'PUT', // Hoặc PATCH tùy thuộc vào cấu trúc của API
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedUserData),
                        })
                            .then((response) => {
                                if (response.ok) {
                                    // Cập nhật lại danh sách khóa học đã đăng ký sau khi xóa
                                    const updatedSavedCourses = savedCourses.filter((course) => course.id !== courseId);
                                    setSavedCourses(updatedSavedCourses);
                                } else {
                                    console.error('Failed to update user data:', response);
                                }
                            })
                            .catch((error) => {
                                console.error('Error updating user data:', error);
                            });
                    }
                }), [email]
            };

    const itemsPerPage = 2;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const coursesToDisplay = savedCourses.slice(startIndex, endIndex);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <div className="listProgress">
            {savedCourses.length > 0 ? (
                coursesToDisplay.map((course: any) => (
                    <div className='ty-contai'>
                        {/* Hiển thị thông tin khóa học */}
                        <div className="courseProgress">
                            <div className="imgCoureProgress">
                                <img src={course.courseIMG} alt="" />
                            </div>
                            <div className="infoCourseProgress">
                                <h3>COURSE</h3>
                                <a href={`/introduction/${course.id}`}> <h2>{course.courseName}</h2></a>
                                <div className="fl-info-progress">
                                    <div className="fl1-info-progress">
                                        <img className='mt-1' src="https://f63-zpg-r.zdn.vn/4940067705430501247/8f148f0e98874fd91696.jpg" alt="" />
                                    </div>
                                    <div className="fl2-info-progress">
                                        LinkedIn - By: Trần Phùng
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="option-course-progress">
                            <div className="dropdown dropdown-right dropdown-end mt-5">
                                <label tabIndex={0} className="btn m-1"><i className="fa-solid fa-ellipsis"></i></label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 right-0 mt-8">
                                    <li><a>Add to collections</a></li>
                                    <li><a>Move to history</a></li>
                                    <li><a onClick={() => handleRemoveCourse(course.id)}>Remove</a></li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))
            ) : (
                <Empty className='mt-20' />
            )}
            {savedCourses.length > itemsPerPage && (
                <Pagination
                    className='mb-3'
                    defaultCurrent={1}
                    total={savedCourses.length}
                    pageSize={itemsPerPage}
                    current={currentPage}
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default Saved;
