import { Router } from "express";
const router = Router();
import dotenv from "dotenv"
dotenv.config();
import { addPaymentMethod, getPaymentMethod, getPaymentMethodById, updatePaymentMethod, addPayment, getPayment, getPaymentById, getPaymentByIdUser, updatePayment, createPayment, vnpayIPN, vnpayReturn, runUrl, haveDonePayment, getPaymentsPaging, getPaymentParams, charDataPayment, charDataPaymentPremium, charDataPaymentPremiumLineChart } from "../controllers/Payment";

//payment Method
router.post("/payment/method/add",  addPaymentMethod);
router.get("/payment/method/get", getPaymentMethod);
router.patch(
  "/payment/method/update",
  
  getPaymentMethodById,
  updatePaymentMethod
);

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

///-payyyment VNPAY

router.post("/create_payment_url", createPayment);

router.get("/vnpay_ipn", vnpayIPN, haveDonePayment);

router.get("/vnpay_return", vnpayReturn);

router.post("/runUrlVnPAY", runUrl);

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