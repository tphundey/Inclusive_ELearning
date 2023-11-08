import { Router } from "express";
const router = Router();
// import Account from "../models/accounts";
// import { Auth, localVariables,  AuthAdmin } from "../middleware/auth";
// require("dotenv").config();
import dotenv from "dotenv"
dotenv.config();

// import { registerMail } from "../controllers/Mailer";
// import moment from "moment";

// import { generateOTP, verifyOTP, createResetSession, resetPassword } from "../controllers/OTP";
// import { getAllAccount, getAccountById, verifyUser, Login, register, update, getAccountByIdAuth, getAccountPaging, updateRoleAccount, updateAccountForStaff, updatePassword, updateUserForAdmin, charDataAccount, charDataSparkLine, updateHolidayMember } from "../controllers/Account";

// import crypto from "crypto";
// import multer, { memoryStorage } from "multer";
// const storage = memoryStorage();
// const upload = multer({ storage: storage });

// import dateFormat from "dateformat";

// import { postImage, getImage } from "../AWS/StoreImageS3";
// import { addSemester, getSemester, updateSemester, getSemesterById, getSemestersPaging } from "../controllers/Semester";
// // import { addCourse, getCourses, getCourseById, updateCourse, getCoursesPaging } from "../controllers/Course";
// import { addSchedule, getSchedules, getScheduleById, updateSchedule, getSchedulesPaging } from "../controllers/Schedule";
// import { addClass, getClasses, getClassById, updateClass, getClassesPaging } from "../controllers/Class";

// import { verifyTokenGoogle, CheckExistAccount } from "../Firebase/Firebase-admin";
import { addPaymentMethod, getPaymentMethod, getPaymentMethodById, updatePaymentMethod, addPayment, getPayment, getPaymentById, getPaymentByIdUser, updatePayment, createPayment, vnpayIPN, vnpayReturn, runUrl, haveDonePayment, getPaymentsPaging, getPaymentParams, charDataPayment, charDataPaymentPremium, charDataPaymentPremiumLineChart } from "../controllers/Payment";
// const {
//   addBooking,
//   getBooking,
//   updateBooking,
//   getBookingsPaging,
// } = require("../controllers/Booking");
// const Semester = require("../models/semesters");
// const { log } = require("console");
// const {
//   addRole,
//   updateRole,
//   getRoleById,
//   getRoles,
// } = require("../controllers/Role");
// const { getUserIP } = require("../middleware/blockIP");
// const {
//   updatePremium,
//   getPremiumById,
//   getPremiums,
//   addPremiumOption,
// } = require("../controllers/Premium");
// const { checkIsMember } = require("../middleware/checkDateIsMember");
// const {
//   getNews,
//   addNews,
//   getNewsById,
//   updateNews,
// } = require("../controllers/News");
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;

//Getting all
// router.get("/accounts", getAllAccount); // thêm phần kiểm tra role người dùng
//Getting one
// router.get("/accounts/:id", getAccountById, (req, res) => {
//   const { password, ...rest } = Object.assign({}, res.account.toJSON());
//   res.send(rest);
// });

//login
// router.post("/accounts/login", verifyUser, Login);

//Creating one
// router.post("/accounts/register", register);
//Updating one
// router.patch("/accounts", Auth, getAccountByIdAuth, update);

//update role for user
// router.patch("/accounts/updateRole", AuthAdmin, updateRoleAccount);

//update user for staff
// router.patch("/staff/account/update",  updateAccountForStaff);

//getAccessToken
// router.get("/accessToken", Auth, getAccountByIdAuth, (req, res) => {
//   const { password, ...rest } = Object.assign({}, res.account.toJSON());
//   res.send(rest);
// });

//Get password
// router.post("/password", Auth, getAccountByIdAuth, (req, res) => {
//   const { password, ...rest } = Object.assign({}, res.account.toJSON());
//   res.send({ password });
// });

//Deleting one

// router.delete("/accounts/:id", getAccountById, async (req, res) => {
//   try {
//     await Account.findByIdAndDelete(res.account.id);
//     res.json({ message: "Deleted Account" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post("/authenticate", verifyUser, (req, res) => res.end());
///End Account
//Genarate OTP

// router.get("/genarateOTP", verifyUser, localVariables, generateOTP);
// router.get("/verifyOTP", verifyUser, verifyOTP);
// router.get("/createResetSession", createResetSession);

//resetPassword
// router.put("/accounts/resetpassword", verifyUser, resetPassword);

//mail
// router.post("/registerMail", registerMail); //sendMail
// module.exports = router;

//image in aws S3
// router.post("/image/post", upload.single("avatar"), postImage);

// router.get("/image/get", getImage);

//semester
// router.post("/semester/add",  addSemester); //thêm phần auth xác thực xem người dùng có mang role là staff hay không
// router.get("/semester/get", getSemester); //ai cũng có thể get
// router.patch("/semester/update",  getSemesterById, updateSemester); //thêm phần auth xác thực xem người dùng có mang role là staff hay không
//course , thêm auth y chang semester
//chưa check down
// router.post("/course/add",  addCourse);
// router.get("/course/get", getCourses);
// router.patch("/course/update",  getCourseById, updateCourse);

//schedule thêm auth y chang semester
// router.post("/schedule/add",  addSchedule);
// router.get("/schedule/get", getSchedules);
// router.patch("/schedule/update",  getScheduleById, updateSchedule);

//class thêm auth
// router.post("/class/add",  addClass);
// router.get("/class/get", getClasses);
// router.patch("/class/update",  getClassById, updateClass);
//payment Method
router.post("/payment/method/add",  addPaymentMethod);
router.get("/payment/method/get", getPaymentMethod);
router.patch(
  "/payment/method/update",
  
  getPaymentMethodById,
  updatePaymentMethod
);

//Role
// router.get("/role/get", AuthAdmin, getRoles);
// router.post("/role/add", AuthAdmin, addRole);
// router.patch("/role/update", AuthAdmin, getRoleById, updateRole);
// router.patch("/admin/update", AuthAdmin, updateUserForAdmin);

//premium
// router.post("/premium/add",  addPremiumOption);
// router.get("/premium/get", getPremiums);
// router.patch("/premium/update",  getPremiumById, updatePremium);

//payment
router.post("/payment/add", /*Auth,*/ addPayment);
router.get("/payment/get", getPayment);
router.get("/payment/get/:id", getPaymentParams);
router.patch("/payment/update",  getPaymentById, updatePayment);
//payment Method
router.post("/payment/method/add",  addPaymentMethod);
router.get("/payment/method/get", getPaymentMethod);
router.patch(
  "/payment/method/update",
  
  getPaymentMethodById,
  updatePaymentMethod
);
// router.post("/booking/add", Auth, checkIsMember, addBooking); // có tài khoản thì mới đucợ book

// router.post("/booking/check", Auth, checkIsMember, (req, res) =>
//   res.status(201).send()
// ); // check book
// router.get("/booking/get", getBooking);
// router.patch("/booking/update", Auth, updateBooking); //người booking nếu đang duyệt thì đc sửa, chỉ ng book mới đc sửa, trong trạng thái duyệt
// //
// router.post("/google/verify", verifyTokenGoogle, CheckExistAccount);

///-payyyment VNPAY

router.post("/create_payment_url", createPayment);

router.get("/vnpay_ipn", vnpayIPN, haveDonePayment);

router.get("/vnpay_return", vnpayReturn);

router.post("/runUrlVnPAY", runUrl);
//news

// router.post("/news/add",  addNews);
// router.get("/news/get", getNews);
// router.patch("/news/update",  getNewsById, updateNews);
// router.get("/getpayment/user", Auth, getPaymentByIdUser);

//pagingnation

// router.get("/coursesPaging/get", getCoursesPaging);
// router.get("/accountsPaging/get", getAccountPaging);
// router.get("/bookingsPaging/get", getBookingsPaging);
// router.get("/paymentsPaging/get", getPaymentsPaging);
// router.get("/schedulesPaging/get", getSchedulesPaging);
// router.get("/semestersPaging/get", getSemestersPaging);
// router.get("/classesPaging/get", getClassesPaging);

//IP
// router.get("/ipUser",getUserIP)
//Chart
router.post("/chart/payments", charDataPayment);
// router.post("/chart/customer", charDataAccount);
// router.post("/chart/product", charDataPaymentPremium);
// router.post("/chart/members", charDataSparkLine);
// router.post("/chart/premium", charDataPaymentPremiumLineChart);

// router.patch("/admin/update", AuthAdmin, updateUserForAdmin);

//update holidat
// router.post("/update/holiday",  updateHolidayMember);
// router.get("/role/get", AuthAdmin, getRoles);
export default router;