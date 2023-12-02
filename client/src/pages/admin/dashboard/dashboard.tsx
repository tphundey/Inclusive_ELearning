import "./dashboard.css";
import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import axios from "axios";
import { formatCurrency } from "@/components/FormatCurency/formatCurency";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/Payment")
      .then((response) => {
        const data = response.data;
        setPaymentData(data);
        const monthlyTotalAmount = {};
        data.forEach((payment) => {
          const date = new Date(payment.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const key = `${year}-${month}`;
          if (monthlyTotalAmount[key]) {
            monthlyTotalAmount[key] += payment.paymentAmount;
          } else {
            monthlyTotalAmount[key] = payment.paymentAmount;
          }
        });

        setMonthlyTotal(monthlyTotalAmount);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu API: ", error);
      });
  }, []);

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
  const uvBillData = Object.keys(monthlyTotal).map((month) => ({
    course: `Tháng ${month}`,
    value: monthlyTotal[month],
    type: `Tháng ${month}`,
  }));
  uvBillData.sort((a, b) => {
    const monthA = parseInt(a.type.split(" ")[1]);
    const monthB = parseInt(b.type.split(" ")[1]);
    return monthA - monthB;
  });
  uvBillData.reverse();

  const uvBillMap = new Map();
  uvBillData.forEach((item) => {
    const type = item.type;
    if (uvBillMap.has(type)) {
      uvBillMap.set(type, uvBillMap.get(type) + item.value);
    } else {
      uvBillMap.set(type, item.value);
    }
  });

  const configChart2 = {
    data: uvBillData,
    padding: "auto",
    xField: "course",
    yField: "value",
    xAxis: {
      tickCount: 5,
    },
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentMonthKey = `${currentYear}-${currentMonth}`;

  const currentMonthRevenue = monthlyTotal[currentMonthKey] || 0;

  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
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

  const percentageAchieved = (currentMonthRevenue / targetRevenue) * 100;
  return (
    <div>
      <div className="mockup-code">
        <pre data-prefix="$">
          <code>npm i Dashboard</code>
        </pre>
      </div>
      <br />
      <div className="flex">
        <div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
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
              <div className="stat-title">Tổng doanh thu /tháng</div>
              <div className="stat-value text-primary">{formattedPrice}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Số thành viên</div>
              <div className="stat-value text-secondary">{userCount}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online"></div>
              </div>
              <div className="stat-value">{percentageAchieved}%</div>
              <div className="stat-title">KPI / 4M</div>
            </div>
          </div>
          <br />
          <br />
          <div className="stats shadow">
            <div className="stat pr-20">
              <div className="stat-title">Tổng khóa học</div>
              <div className="stat-value">{courseCount}</div>
            </div>

            <div className="stat pr-20">
              <div className="stat-title">Tổng danh mục</div>
              <div className="stat-value">{cateCount}</div>
            </div>

            <div className="stat pr-20">
              <div className="stat-title">Tổng số đánh giá</div>
              <div className="stat-value">{feedCount}</div>
            </div>
          </div>
        </div>

        <div
          style={{ width: "620px", paddingLeft: "20px" }}
          className="m-[24px]"
        >
          <Line {...configChart2} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
