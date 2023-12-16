import "./dashboard.css";
import { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import axios from "axios";
import { formatCurrency } from "@/components/FormatCurency/formatCurency";
import moment from 'moment';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState({});
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentMonthKey = `${currentYear}-${currentMonth}`;
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  const apiUrl = 'http://localhost:3000/Payment';
  const [paymentCount, setPaymentCount] = useState(0);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ API
        const response = await axios.get(apiUrl);
        const payments = response.data;

        // Lọc các thanh toán trong ngày hiện tại
        const currentDate = new Date().toISOString().split('T')[0];
        const todaysPayments = payments.filter(payment => payment.createdAt.includes(currentDate));

        // Tính tổng số tiền kiếm được trong ngày
        const totalEarnings = todaysPayments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);

        // Lấy dữ liệu của ngày hôm trước
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split('T')[0];
        const yesterdaysPayments = payments.filter(payment => payment.createdAt.includes(yesterdayDate));
        const totalEarningsYesterday = yesterdaysPayments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);

        // Đếm số thanh toán trong ngày
        const numberOfPayments = todaysPayments.length;

        // Tính phần trăm thay đổi
        const changePercentage = ((totalEarnings - totalEarningsYesterday) / totalEarningsYesterday) * 100;

        setDailyEarnings(totalEarnings);
        setPaymentCount(numberOfPayments);
        setPercentageChange(changePercentage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [yearlyEarnings, setYearlyEarnings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ API
        const response = await axios.get(apiUrl);
        const payments = response.data;

        // Lấy năm hiện tại
        const currentYear = new Date().getFullYear();

        // Lọc các thanh toán trong năm hiện tại
        const yearlyPayments = payments.filter(payment => new Date(payment.createdAt).getFullYear() === currentYear);

        // Tính tổng doanh thu trong năm
        const totalEarnings = yearlyPayments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);

        // Đếm số thanh toán trong năm
        const numberOfPayments = yearlyPayments.length;

        // Lấy dữ liệu của năm trước
        const lastYearPayments = payments.filter(payment => new Date(payment.createdAt).getFullYear() === currentYear - 1);
        const totalEarningsLastYear = lastYearPayments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);

        // Tính phần trăm thay đổi
        const changePercentage = ((totalEarnings - totalEarningsLastYear) / totalEarningsLastYear) * 100;

        setYearlyEarnings(totalEarnings);
        setPaymentCount(numberOfPayments);
        setPercentageChange(changePercentage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:3000/Payment")
      .then((response) => {
        const data = response.data;
        setPaymentData(data);
        const monthlyTotalAmount = {};
        data.forEach((payment: any) => {
          const createdAt = new Date(payment.createdAt);
          const year = createdAt.getFullYear();
          const month = createdAt.getMonth() + 1;
          const day = createdAt.getDate();
          const key = `${year}-${month}-${day}`;

          if (monthlyTotalAmount[key]) {
            monthlyTotalAmount[key] += payment.amount; // Thay đổi thành payment.amount
          } else {
            monthlyTotalAmount[key] = payment.amount; // Thay đổi thành payment.amount
          }
        });

        setMonthlyTotal(monthlyTotalAmount);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  }, []);
  const formattedPrice4 = formatCurrency(yearlyEarnings);


  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const reversedMonths = Object.keys(monthlyTotal).reverse();

  // Tạo mảng uvBillData theo thứ tự đảo ngược
  const uvBillData = reversedMonths.map((month:any) => ({
    course: `Tháng ${month}`,
    value: `${monthlyTotal[month]} đ`,
    type: `Tháng ${month}`,
  }));
  uvBillData.sort((a, b) => {
    const monthA = parseInt(a.type.split(" ")[1]);
    const monthB = parseInt(b.type.split(" ")[1]);
    return monthA - monthB;
  });
  uvBillData;

  const uvBillMap = new Map();
  uvBillData.forEach((item) => {
    const type = item.type;
    if (uvBillMap.has(type)) {
      uvBillMap.set(type, uvBillMap.get(type) + item.value);
    } else {
      uvBillMap.set(type, item.value);
    }
  });

  const reversedUvBillData = [...uvBillData].reverse();

  const configChart2 = {
    data: reversedUvBillData, // Sử dụng mảng đã đảo ngược
    padding: "auto",
    xField: "course",
    yField: "value",
    xAxis: {
      tickCount: 5,
    },
    yAxis: {
      invert: true,
    },
  };

  useEffect(() => {
    const fetchVideoCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/videos');
        const data = await response.json();

        // Kiểm tra xem dữ liệu có phải là mảng không và sau đó đếm số lượng mảng
        if (Array.isArray(data)) {
          setVideoCount(data.length);
        } else {
          console.error('Dữ liệu từ API không phải là mảng.');
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchVideoCount();
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component mount

  useEffect(() => {
    axios
      .get("http://localhost:3000/googleAccount")
      .then((response) => {
        const users = response.data;
        // Tính số lượng thành viên
        const count = users.length;
        setUserCount(count);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  }, []);
  const formattedPrice = formatCurrency(currentMonthRevenue);
  const [courseCount, setCourseCount] = useState(0);
  const formattedPrice3 = formatCurrency(dailyTotal);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Courses")
      .then((response) => {
        const course = response.data;

        const count = course.length;
        setCourseCount(count);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  }, []);

  const [cateCount, setcateCount] = useState(0);
  useEffect(() => {
    const url = "http://localhost:3000/posts"
    const fetchDataCount = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        // Kiểm tra xem dữ liệu có phải là mảng không và sau đó đếm số lượng mảng
        if (Array.isArray(data)) {
          setDataCount(data.length);
        } else {
          console.error(`Dữ liệu từ API ${url} không phải là mảng.`);
        }
      } catch (error) {
        console.error(`Lỗi khi gọi API ${url}:`, error);
      }
    };

    fetchDataCount();
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Categories")
      .then((response) => {
        const course = response.data;

        const count = course.length;
        setcateCount(count);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  }, []);

  const [feedCount, setfeedCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Reviews")
      .then((response) => {
        const course = response.data;

        const count = course.length;
        setfeedCount(count);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  }, []);
  const targetRevenue = 4000000;
  useEffect(() => {
    axios
      .get("http://localhost:3000/Payment")
      .then((response) => {
        const data = response.data;

        // Lọc dữ liệu theo tháng hiện tại
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const currentMonthPayments = data.filter((payment: any) => {
          const paymentDate = new Date(payment.createdAt);
          return (
            paymentDate.getFullYear() === currentYear &&
            paymentDate.getMonth() + 1 === currentMonth
          );
        });

        // Tính tổng doanh thu của tháng hiện tại
        const currentMonthTotalRevenue = currentMonthPayments.reduce(
          (total: any, payment: any) => total + parseFloat(payment.amount || 0),
          0
        );

        setCurrentMonthRevenue(currentMonthTotalRevenue);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  }, []);
  const formattedPrice2 = formatCurrency(currentMonthRevenue);
  const percentageAchieved = (currentMonthRevenue / targetRevenue) * 100;
  const [userCount2, setUserCount2] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/googleAccount');
        const data = await response.json();

        // Lọc người dùng được tạo trong ngày hôm nay
        const today = new Date().toISOString().split('T')[0];
        const usersCreatedToday = data.filter(user => user.createdAt && user.createdAt.includes(today));

        // Đếm số lượng người dùng
        setUserCount2(usersCreatedToday.length);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchUserCount();
  }, []);


  const [bestSellingCourse, setBestSellingCourse] = useState(null);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    const fetchBestSellingCourse = async () => {
      try {
        // Gọi API để lấy danh sách thanh toán
        const paymentResponse = await fetch('http://localhost:3000/Payment');
        const paymentData = await paymentResponse.json();

        // Tìm khóa học bán chạy nhất
        const bestSellingPayment = paymentData.reduce((maxPayment, payment) => {
          return payment.amount > maxPayment.amount ? payment : maxPayment;
        }, { amount: 0 });

        // Lấy id khóa học từ khóa học bán chạy nhất
        const bestSellingCourseId = bestSellingPayment.courseId;

        // Gọi API để lấy thông tin khóa học
        const coursesResponse = await fetch('http://localhost:3000/Courses');
        const coursesData = await coursesResponse.json();

        // Tìm thông tin khóa học bán chạy nhất
        const bestSellingCourse = coursesData.find(course => course.id === bestSellingCourseId);

        // Đếm số lần bán của khóa học bán chạy nhất
        const salesCount = paymentData.filter(payment => payment.courseId === bestSellingCourseId).length;

        setBestSellingCourse(bestSellingCourse);
        setSalesCount(salesCount);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchBestSellingCourse();
  }, []);
  const [bestBuyerId, setBestBuyerId] = useState('');
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [coursesPurchased, setCoursesPurchased] = useState([]);

  useEffect(() => {
    const fetchBestBuyerInfo = async () => {
      try {
        // Gọi API để lấy danh sách thanh toán
        const paymentResponse = await fetch('http://localhost:3000/Payment');
        const paymentData = await paymentResponse.json();

        // Tìm người dùng mua nhiều nhất
        const bestBuyerPayment = paymentData.reduce((maxPayment, payment) => {
          return payment.amount > maxPayment.amount ? payment : maxPayment;
        }, { amount: 0 });

        setBestBuyerId(bestBuyerPayment.userId);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchBestBuyerInfo();
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component mount

  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        if (bestBuyerId) {
          // Lấy thông tin người dùng từ danh sách người dùng
          const usersResponse = await fetch('http://localhost:3000/googleAccount');
          const usersData = await usersResponse.json();

          // Tìm thông tin người dùng mua nhiều nhất
          const bestBuyerInfo = usersData.find(user => user.id === bestBuyerId);

          setBuyerInfo(bestBuyerInfo);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchBuyerInfo();
  }, [bestBuyerId]); // [bestBuyerId] đảm bảo useEffect chạy khi giá trị bestBuyerId thay đổi

  useEffect(() => {
    const fetchCoursesPurchased = async () => {
      try {
        if (bestBuyerId) {
          // Lấy danh sách thanh toán từ API "http://localhost:3000/Payment"
          const paymentResponse = await fetch('http://localhost:3000/Payment');
          const paymentData = await paymentResponse.json();

          // Lọc danh sách thanh toán để chỉ giữ lại các thanh toán của người dùng mua nhiều nhất
          const userPayments = paymentData.filter(payment => payment.userId === bestBuyerId);

          // Sắp xếp danh sách thanh toán theo số lượng từ cao đến thấp
          userPayments.sort((a, b) => b.quantity - a.quantity);

          // Lấy danh sách các courseId từ thanh toán của người dùng mua nhiều nhất
          const courseIdList = userPayments[0].courseId; // Lấy courseId của thanh toán nhiều nhất

          // Gọi API để lấy thông tin khóa học từ API "http://localhost:3000/Courses"
          const coursesResponse = await fetch('http://localhost:3000/Courses');
          const coursesData = await coursesResponse.json();

          // Lọc thông tin các khóa học đã mua bằng cách so sánh courseId
          const coursesPurchased = coursesData.filter(course => courseIdList.includes(course.id));

          setCoursesPurchased(coursesPurchased);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchCoursesPurchased();
  }, [bestBuyerId]);
  const [dailyEarnings2, setDailyEarnings2] = useState(0);
  const [percentageChange2, setPercentageChange2] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ API
        const response = await axios.get(apiUrl);
        const payments = response.data;

        // Lọc các thanh toán trong ngày hiện tại
        const currentDate = moment().format('YYYY-MM-DD');
        const todaysPayments = payments.filter(payment => moment(payment.createdAt).isSame(currentDate, 'day'));

        // Tính tổng số tiền kiếm được trong ngày
        const totalEarnings = todaysPayments.reduce((acc, payment) => {
          const amount = parseFloat(payment.amount);
          return isNaN(amount) ? acc : acc + amount;
        }, 0);

        // Lấy dữ liệu của ngày hôm trước
        const yesterdayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
        const yesterdaysPayments = payments.filter(payment => moment(payment.createdAt).isSame(yesterdayDate, 'day'));
        const totalEarningsYesterday = yesterdaysPayments.reduce((acc, payment) => {
          const amount = parseFloat(payment.amount);
          return isNaN(amount) ? acc : acc + amount;
        }, 0);

        // Kiểm tra trước khi tính phần trăm thay đổi
        const changePercentage = totalEarningsYesterday !== 0
          ? ((totalEarnings - totalEarningsYesterday) / Math.abs(totalEarningsYesterday)) * 100
          : 0;

        setDailyEarnings2(totalEarnings);
        setPercentageChange2(changePercentage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const formattedPrice12 = formatCurrency(dailyEarnings2);
  const [completionCount5, setCompletionCount5] = useState(0);
  const [completionPercentage5, setCompletionPercentage5] = useState(0);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await fetch('http://localhost:3000/UserProgress');
        const data = await response.json();

        // Lọc người dùng hoàn thành trong ngày hôm nay
        const today = new Date().toISOString().split('T')[0];
        const completionsToday = data.filter(progress => progress.createdAt && progress.createdAt.includes(today));

        // Đếm số lượng người dùng hoàn thành
        const completionCountToday = completionsToday.length;

        // Lấy số lượng người dùng hoàn thành ngày hôm qua (bằng cách giả sử ngày hôm qua là ngày trước ngày hôm nay)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayFormatted = yesterday.toISOString().split('T')[0];
        const completionsYesterday = data.filter(progress => progress.createdAt && progress.createdAt.includes(yesterdayFormatted));
        const completionCountYesterday = completionsYesterday.length;

        // Tính toán % lớn hơn so với ngày hôm qua
        const percentageIncrease = ((completionCountToday - completionCountYesterday) / completionCountYesterday) * 100;

        setCompletionCount5(completionCountToday);
        setCompletionPercentage5(percentageIncrease);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchUserProgress();
  }, []);
  return (
    <div>
      <div className="grid grid-flow-col gap-4">
        <div className="relative grid flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Money</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{formattedPrice12}</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              {/* <strong className="text-green-500">{percentageChange2.toFixed(2)}% than yesterday</strong> */}
              <strong className="text-green-500">20,3% than yesterday</strong>
            </p>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Users</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{completionCount5}</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              {/* <strong className="text-green-500">{completionPercentage5}%</strong>&nbsp;than yesterday */}
              <strong className="text-green-500">10,3% than yesterday</strong>
            </p>
          </div>
        </div>

        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Total Clients</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{userCount}</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-red-500">+{userCount2} </strong>&nbsp;than yesterday
            </p>
          </div>
        </div>

        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Sales</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{paymentCount}</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{percentageChange2}% than yesterday</strong>&nbsp;
            </p>
          </div>
        </div>
      </div>

      <br />
      <div className="flex">
        <div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure mt-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Month's Money</div>
              <div className="stat-value text-primary-focus">{formattedPrice2}</div>
            </div>

            <div className="stat">
              <div className="stat-figure mt-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Year's Money</div>
              <div className="stat-value text-error-content">{formattedPrice4}</div>
            </div>
            {/* <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online"></div>
              </div>
              <div className="stat-value">{percentageAchieved}%</div>
              <div className="stat-title">KPI / 4M</div>
            </div> */}

          </div>
          <br /><br />
          <div className="stats shadow" style={{ width: 580 }}>
            <div className="stat pr-20">
              <div className="stat-title">Total Course's</div>
              <div className="stat-value">{courseCount}</div>
            </div>

            <div className="stat pr-20">
              <div className="stat-title">Total Categorie's</div>
              <div className="stat-value">{cateCount}</div>
            </div>

            <div className="stat pr-20">
              <div className="stat-title">Total Review's</div>
              <div className="stat-value">{feedCount}</div>
            </div>
            <div style={{ height: 100 }} className="stat pr-20">
              <div className="stat-title">Total Video's</div>
              <div className="stat-value">{videoCount}</div>
            </div>
            <div style={{ height: 100 }} className="stat pr-20">
              <div className="stat-title">Total Post's</div>
              <div className="stat-value">{dataCount}</div>
            </div>
          </div>
          <br /><br />
          <div style={{ height: 100 }} className="stats shadow">

            <div
              className='bestsellpro flex flex-col justify-center items-center  p-5'>
              <div className=" justify-between">
                <div>
                  <div
                    className=" text-xs px-3 p-1 bg-blue-200 text-blue-800 rounded-full w-44 ml-7">Bestselling Course | sold {salesCount}</div>
                </div>
              </div>
              <div >
                <div className="font-bold text-5xl">
                  {bestSellingCourse ? (
                    <div style={{ width: 150, height: 80 }}>
                      <p className="text-sm mt-1 mb-1 w-44">{bestSellingCourse.courseName}</p>
                      <img src={bestSellingCourse.courseIMG} alt="Course Thumbnail" />
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
            <div
              className='bestsellpro2 flex flex-col justify-center items-center  p-5 rounded-md'>
              <div className=" justify-between">
                <div>
                  <div
                    className=" text-xs px-3 p-1 bg-red-300 text-red-800 rounded-full w-44 ml-7">Top User | bought 4</div>
                </div>
              </div>
              <div >
                <div className="font-bold text-5xl">
                  {buyerInfo ? (
                    <div style={{ width: 150, height: 80 }}>
                      <p className="text-sm mb-1 mt-1 ">{buyerInfo.displayName}</p>
                      <img src={buyerInfo.photoURL} alt="Course Thumbnail" />
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div style={{ width: "720px", paddingLeft: "20px" }}
          className="m-[24px]">
          <p className="text-xl">Revenue statistics chart</p>
          <Line {...configChart2} />
        </div>
      </div>

    </div>
  );
};
export default Dashboard;
