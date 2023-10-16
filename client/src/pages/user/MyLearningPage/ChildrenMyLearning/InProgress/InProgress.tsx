import { useState, useEffect } from 'react';

// Hàm giải mã dữ liệu sử dụng decodeURIComponent
function decodeData(encryptedData: any): any {
    return decodeURIComponent(encryptedData);
}

const InProgress = () => {
    const [savedCourses, setSavedCourses] = useState([]);
    const [email, setEmail] = useState(''); // Lưu email của người dùng
    const [encryptedData, setEncryptedData] = useState<any>(null);

    // Bước 1: Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
    const encryptedProfile = localStorage.getItem('profile');
    if (encryptedProfile) {
        const decryptedProfile = decodeData(encryptedProfile);

        // Bước 2: Chuyển thông tin đã giải mã thành đối tượng JSON
        const profile = JSON.parse(decryptedProfile);

        // Bước 3: Lấy email từ đối tượng profile
        const userEmail = profile.email;

        console.log('Email của người dùng:', userEmail);

        // Bước 4: Sử dụng email trong truy vấn hoặc hiển thị
    } else {
        console.log('Không tìm thấy thông tin người dùng đã mã hóa trong Local Storage.');
    }

    useEffect(() => {
        async function start() {
            // Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
            const encryptedProfile: any = localStorage.getItem('profile');
            if (encryptedProfile) {
                const decryptedProfile: any = decodeData(encryptedProfile);
                console.log('Thông tin đã được giải mã từ localStorage:', decryptedProfile);
                setEncryptedData(decryptedProfile);
            }
            else {
                console.log('Ko chạy');
            }
        }
        start();
    }, []);

    useEffect(() => {
        // Bước 1: Kiểm tra và giải mã dữ liệu từ localStorage (nếu có)
        const encryptedProfile = localStorage.getItem('profile');
        if (encryptedProfile) {
            const decryptedProfile = decodeData(encryptedProfile);
            // Bước 2: Chuyển thông tin đã giải mã thành đối tượng JSON
            const profile = JSON.parse(decryptedProfile);
            // Bước 3: Lấy email từ đối tượng profile
            const userEmail = profile.email;
            console.log('Email của người dùng:', userEmail);

            // Bước 4: Sử dụng email để lấy danh sách khóa học đã lưu
            fetch(`http://localhost:3000/googleAccount?email=${userEmail}`)
                .then((response) => response.json())
                .then((userData) => {
                    if (userData.length > 0) {
                        const user = userData[0];
                        // Bước 5: Lấy danh sách id khóa học đã lưu từ thông tin người dùng
                        const savedCourseIds = user.courseSaved;

                        // Bước 6: Thực hiện truy vấn để lấy danh sách khóa học từ cơ sở dữ liệu
                        fetch(`http://localhost:3000/Courses`)
                            .then((response) => response.json())
                            .then((coursesData) => {
                                // Bước 7: Lọc danh sách khóa học dựa trên id đã lưu
                                const savedCourses = coursesData.filter((course) =>
                                    savedCourseIds.includes(course.id)
                                );
                                // Bước 8: Lưu danh sách khóa học vào state
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

    return (
        <div className="listProgress">

            {savedCourses.map((course: any) => (
                <div>
                    <div className="courseProgress">
                        <div className="imgCoureProgress">
                            <img src={course.courseIMG} alt="" />
                        </div>
                        <div className="infoCourseProgress">
                            <h3>COURSE</h3>
                            <a href={`/introduction/${course.id}`}> <h2>{course.courseName}</h2></a>
                            <div className="fl-info-progress">
                                <div className="fl1-info-progress">
                                    <img src="https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1700092800&v=beta&t=MFjcNX0hJDW7Goe5R8ZoAUHDj4B5d0UltcbssljghMY" alt="" />
                                </div>
                                <div className="fl2-info-progress">
                                    LinkedIn - By: Hương Trà - 1 month ago
                                </div>
                            </div>
                        </div>
                        <div className="option-course-progress">
                            <button><i className="fa-solid fa-ellipsis"></i></button>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
};

export default InProgress;
