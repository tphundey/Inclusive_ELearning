useEffect(() => {
    // Lấy danh sách tất cả các khóa học từ http://localhost:1337/api/courses
    fetch('http://localhost:1337/api/courses')
        .then(response => response.json())
        .then(data => {
            console.log(data.data);

            setCourses(data.data);
        })
        .catch(error => console.error('Lỗi khi lấy danh sách khóa học:', error));
}, []);

useEffect(() => {
    // Lấy thông tin khóa học từ http://localhost:1337/api/courses/11
    fetch('http://localhost:1337/api/courses/11')
        .then(response => response.json())
        .then(course => {
              console.log(course,'1');
              
            // Lọc danh sách các khóa học cùng loại dựa vào categoryId
            const categoryIdToFilter = course.data.attributes.categoryId;
            const filteredCourses = courses.filter(course => course.categoryId === categoryIdToFilter);
            console.log(filteredCourses,'2');

            // Lưu danh sách khóa học cùng loại vào state
            setRelatedCourses(filteredCourses);
        })
        .catch(error => console.error('Lỗi khi lấy thông tin khóa học:', error));
}, [courses]);