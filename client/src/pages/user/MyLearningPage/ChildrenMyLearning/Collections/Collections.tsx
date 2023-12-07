import { useState, useEffect } from 'react';
import { Empty, Pagination } from 'antd';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/components/GetAuth/firebaseConfig';

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Collection = () => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<any | null>(null);
    const [userId, setUserId] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [savedCourses, setSavedCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setEmail(currentUser?.email);
            setUserId(currentUser?.uid)

            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [auth]);
    console.log(userId);

    useEffect(() => {
        fetch(`http://localhost:3000/googleAccount/${userId}`)
            .then((response) => response.json())
            .then((userData) => {
                if (userData) {
                    const user = userData;
                    const savedCourseIds = user.collectionCourseID;
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
        fetch(`http://localhost:3000/googleAccount/${userId}`)
            .then((response) => response.json())
            .then((userData: any) => {
                if (userData) {
                    const user = userData;
                    const registeredCourseIds = user.collectionCourseID;
                    const updatedRegisteredCourseIds = registeredCourseIds.filter((id: any) => id !== courseId);
                    const updatedUserData = { ...user, collectionCourseID: updatedRegisteredCourseIds };
                    fetch(`http://localhost:3000/googleAccount/${user.id}`, {
                        method: 'PUT', // Hoặc PATCH tùy thuộc vào cấu trúc của API
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUserData),
                    })
                        .then((response: any) => {
                            if (response.ok) {
                                // Cập nhật lại danh sách khóa học đã đăng ký sau khi xóa
                                const updatedSavedCourses = savedCourses.filter((course: any) => course.id !== courseId);
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
    const handleMoveToHistory = (courseId: any) => {
        fetch(`http://localhost:3000/googleAccount/${userId}`)
            .then((response) => response.json())
            .then((userData) => {
                if (userData) {
                    const user = userData;
                    const registeredCourseIds = user.collectionCourseID;


                    const updatedRegisteredCourseIds = registeredCourseIds.filter((id:any) => id !== courseId);

                    const updatedHistoryCourseIds = [...user.historyCourseID, courseId];

                    const updatedUserData = {
                        ...user,
                        collectionCourseID: updatedRegisteredCourseIds,
                        historyCourseID: updatedHistoryCourseIds,
                    };

                    fetch(`http://localhost:3000/googleAccount/${user.id}`, {
                        method: 'PUT', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUserData),
                    })
                        .then((response) => {
                            if (response.ok) {

                                const updatedSavedCourses = savedCourses.filter((course:any) => course.id !== courseId);
                                setSavedCourses(updatedSavedCourses);
                            } else {
                                console.error('Failed to update user data:', response);
                            }
                        })
                        .catch((error) => {
                            console.error('Error updating user data:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching user data: ', error);
            });
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
                coursesToDisplay.reverse().map((course: any) => (
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
                                    <li><a onClick={() => handleMoveToHistory(course.id)}>Move to history</a></li>
                                    <li><a onClick={() => handleRemoveCourse(course.id)}>Remove</a></li> {/* Thêm hàm xử lý xóa */}
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

export default Collection;
