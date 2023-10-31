import  { useState, useEffect } from 'react';
import { Empty, Pagination } from 'antd';

// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

const InProgress = () => {
    const [savedCourses, setSavedCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Thêm trạng thái trang hiện tại
    // const [encryptedData, setEncryptedData] = useState<any>(null);
    const [, setEncryptedData] = useState<any>(null);
    useEffect(() => {
        async function start() {
            // Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
            const encryptedProfile: any = localStorage.getItem('profile');
            if (encryptedProfile) {
                const decryptedProfile: any = decodeData(encryptedProfile);
                console.log('Thông tin đã được giải mã từ localStorage:', decryptedProfile);
                setEncryptedData(decryptedProfile);
            } else {
                console.log('Ko chạy');
            }
        }
        start();
    }, []);

    useEffect(() => {
        const encryptedProfile = localStorage.getItem('profile');
        if (encryptedProfile) {
            const decryptedProfile = decodeData(encryptedProfile);
            const profile = JSON.parse(decryptedProfile);
            const userEmail = profile.email;
            console.log('Email của người dùng:', userEmail);

            fetch(`http://localhost:3000/googleAccount?email=${userEmail}`)
                .then((response) => response.json())
                .then((userData) => {
                    if (userData.length > 0) {
                        const user = userData[0];
                        const savedCourseIds = user.registeredCourseID;
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
        } else {
            console.log('Không tìm thấy thông tin người dùng đã mã hóa trong Local Storage.');
        }
    }, []);

    // Số lượng phần tử mỗi trang
    const itemsPerPage = 2;

    // Tính chỉ mục bắt đầu và chỉ mục kết thúc dựa trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Danh sách khóa học cần hiển thị trên trang hiện tại
    const coursesToDisplay = savedCourses.slice(startIndex, endIndex);

    const handlePageChange = (page:any) => {
        setCurrentPage(page);
    };

    return (
        <div className="listProgress">
            {savedCourses.length > 0 ? (
                coursesToDisplay.map((course: any) => (
                    <div>
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
                                        <img src="https://f63-zpg-r.zdn.vn/4940067705430501247/8f148f0e98874fd91696.jpg" alt="" />
                                    </div>
                                    <div className="fl2-info-progress">
                                        LinkedIn - By: Trần Phùng 
                                    </div>
                                </div>
                            </div>
                            <div className="option-course-progress">
                                <button><i className="fa-solid fa-ellipsis"></i></button>
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

export default InProgress;
