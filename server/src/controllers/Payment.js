import PaymentMethod from "../models/payment_methods";
import Payment from "../models/payments";
import dotenv from "dotenv"
import qs from "qs"
dotenv.config();
import moment from "moment";
import dateFormat from "dateformat";
import cryptojs from "crypto-js";
import crypto from "crypto";
// import { log } from "console";
// import { registerMail } from "./Mailer";
import { createTransport } from "nodemailer";
import Mailgen from "mailgen";
import { pagingnation } from "./Pagingnation";
import Booking from "../models/course";
import { log } from "console";

export const addPaymentMethod =async (req, res) =>{
  // const ngu = cryptyjs
  const { paymentname } = req.body;
  try {
    const paymentMethod = new PaymentMethod({
      paymentname: paymentname,
    });
    // return save result as a response
    paymentMethod
      .save()
      .then((result) =>
        res.status(201).send({ msg: "Add Payment Method Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getPaymentMethod = async (req, res) =>{
  try {
    const paymentMethod = await find();
    res.send(paymentMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updatePaymentMethod = async (req, res) => {
  const fieldsToUpdate = ["paymentname", "status", "meta_data"];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.paymentMethod[field] = req.body[field];
    }
  }
  try {
    const updatePaymentMethod = await res.paymentMethod.save();
    res.json(updatePaymentMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const  getPaymentMethodById = async(req, res, next)=> {
  let paymentMethod;
  try {
    paymentMethod = await findById(req.body._id);
    if (paymentMethod === null) {
      return res.status(404).json({ message: "Cannot Find Payment Method" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.paymentMethod = paymentMethod;
  next();
}

// export const addPaymentMethod(req, res) {
//   const { paymentname, image } = req.body;
//   try {
//     const paymentMethod = new PaymentMethod({
//       paymentname: paymentname,
//       image: image,
//     });
//     // return save result as a response
//     paymentMethod
//       .save()
//       .then((result) =>
//         res.status(201).send({ msg: "Add Payment Method Successfully" })
//       )
//       .catch((error) => res.status(500).send({ error: error.message }));
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

//------------------------------------------------------------------------------------------------------//
//payment chưa làm ghim lại
export const addPayment = async (req, res) =>{
  const {
    recipient,
    paymentDate,
    paymentAmount,
    paymentMethod_id,
    booking_id,
    description,
    premium_id,
    status,
    meta_data,
  } = req.body;
  try {
    const payment = new Payment({
      recipient,
      paymentDate,
      paymentAmount,
      paymentMethod_id,
      booking_id,
      description,
      premium_id,
      status,
      meta_data,
    });
    // return save result as a response
    payment
      .save()
      .then((result) =>
        res.status(201).send({ result, msg: "Add Payment Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getPayment =async(req, res)=> {
  try {
    const payment = await _find();
    res.send(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getPaymentParams =async(req, res)=> {
  try {
    const payment = await _findById(req.params.id);
    if (payment === null) {
      return res.status(404).json({ message: "Cannot Find Payment" });
    }
    res.send(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getPaymentsPaging =async(req, res)=> {
  try {
    const pagingPayload = await pagingnation(Payment, null, req.query);
    res.send(pagingPayload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updatePayment = async(req, res)=> {
  const fieldsToUpdate = [
    "recipient",
    "paymentDate",
    "paymentAmount",
    "paymentMethod_id",
    "booking_id",
    "description",
    "premium_id",
    "status",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.payment[field] = req.body[field];
    }
  }
  try {
    const updatePayment = await res.payment.save();
    res.json(updatePayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getPaymentById = async(req, res, next)=> {
  let payment;
  try {
    payment = await _findById(req.body._id);
    if (payment === null) {
      return res.status(404).json({ message: "Cannot Find Payment" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.payment = payment;
  next();
}

export const createPayment = async(req, res, next)=> {
  var ipAddr =
  req.headers["x-forwarded-for"] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;

var tmnCode = process.env.vnp_TmnCode;
var secretKey = process.env.vnp_HashSecret;
var vnpUrl = process.env.vnp_Url;
var returnUrl = process.env.vnp_ReturnUrl;
var date = new Date();
var expireDate = moment(date).add(10, "minutes").format("YYYYMMDDHHmmss");
let createDate = moment(date).format("YYYYMMDDHHmmss");
var orderId = dateFormat(date, "HHmmss");
var amount = req.body.amount;
var bankCode = "VNBANK"; //'VNPAYQR' //req.body.bankCode;
var orderInfo = req.body.orderDescription;
var orderType = req.body.orderType;
var locale = "vn";
if (locale === null || locale === "") {
  locale = "vn";
}
var currCode = "VND";
var vnp_Params = {};
vnp_Params["vnp_Version"] = "2.1.0";
vnp_Params["vnp_Command"] = "pay";
vnp_Params["vnp_TmnCode"] = tmnCode;
// vnp_Params['vnp_Merchant'] = ''
vnp_Params["vnp_Locale"] = locale;
vnp_Params["vnp_CurrCode"] = currCode;
vnp_Params["vnp_TxnRef"] = orderId;
vnp_Params["vnp_OrderInfo"] = orderInfo;
vnp_Params["vnp_OrderType"] = orderType;
vnp_Params["vnp_Amount"] = amount * 100;
vnp_Params["vnp_ReturnUrl"] = returnUrl;
vnp_Params["vnp_IpAddr"] = ipAddr;
vnp_Params["vnp_CreateDate"] = createDate;
vnp_Params["vnp_ExpireDate"] = expireDate;

if (bankCode !== null && bankCode !== "") {
  vnp_Params["vnp_BankCode"] = bankCode;
}

vnp_Params = sortObject(vnp_Params);

// var querystring = require("qs");
var signData = qs.stringify(vnp_Params, { encode: false });
// var crypto = require("crypto");
var hmac = crypto.createHmac("sha512", secretKey);
var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
vnp_Params["vnp_SecureHash"] = signed;
vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

res.send(vnpUrl);
// res.redirect(vnpUrl);

//   res.writeHead(302, {
//     Location: ur
// });
  // res.redirect(vnpUrl);
}

export const runUrl = async(req, res, next)=> {
  res.redirect(req.url);
}

export const vnpayIPN = async(req, res, next)=> {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let secretKey = process.env.vnp_HashSecret;
  // let querystring = require("qs");
  let signData = qs.stringify(vnp_Params, { encode: false });
  // let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  const getData = vnp_Params["vnp_OrderInfo"]; //id,thiengk563@gmail.com,name
  const dataArray = getData.split("%2C");
  console.log(dataArray);
  const userID = dataArray[0];
  const email = dataArray[1];
  const usernamePayment = dataArray[2];
  const premium_id = dataArray[3];
  const replacedEmail = email.replace("%40", "@");
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus == "0") {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode == "00") {
            const booking = new Booking({
              member_id: userID,
            });
            booking.save().then((result) => {
              const bookingID = result._id;
              const payment = new Payment({
                recipient: "Yoga HeartBeat",
                paymentDate: vnp_Params["vnp_PayDate"],
                paymentAmount: vnp_Params["vnp_Amount"] / 100,
                paymentMethod_id: "647da80b6aa8563399cbc6ff",
                booking_id: bookingID,
                premium_id: premium_id,
                status: 10,
                meta_data: `${vnp_Params["vnp_BankCode"]} ${vnp_Params["vnp_CardType"]}`,
              });
              // return save result as a response
              payment
                .save()
                .then(async (result) => {
                  const premiumName = await findOne({
                    _id: premium_id,
                  });
                  const date = new Date();
                  const dateString = date.toISOString();
                  const memeberAccount = await findOneAndUpdate(
                    { _id: userID },
                    {
                      meta_data: `{"isMember":true,"MemberDuration":${premiumName.durationByMonth},"startDateMember":"${dateString}"}`,
                    }
                  );
                  req.user = {
                    userEmail: replacedEmail,
                    username: usernamePayment,
                    text: `We are pleased to inform you that your payment (id; ${
                      result._id
                    }) for ${
                      premiumName && premiumName.premiumname
                    } package has been successfully processed. Thank you for your purchase and for choosing our services. If you have any questions or need further assistance, please don't hesitate to contact our support team.`,
                    subject: "Payment Successful",
                    result_id: result._id,
                  };
                  next();
                })
                .catch((error) =>
                  res.status(500).send({ error: error.message })
                );
            });
          } else {
            //fail
            const booking = new Booking({
              member_id: userID,
            });
            booking.save().then((result) => {
              const bookingID = result._id;

              const payment = new Payment({
                recipient: "Yoga HeartBeat",
                paymentDate: vnp_Params["vnp_PayDate"],
                paymentAmount: vnp_Params["vnp_Amount"] / 100,
                paymentMethod_id: "647da80b6aa8563399cbc6ff",
                booking_id: bookingID,
                premium_id: premium_id,
                status: 5,
                meta_data: `${vnp_Params["vnp_BankCode"]} ${vnp_Params["vnp_CardType"]}`,
              });
              // return save result as a response
              const usernamePayment = dataArray[2];
              payment
                .save()
                .then(async (result) => {
                  const memeberAccount = await findOneAndUpdate(
                    { _id: userID },
                    { meta_data: `{"isMember":false}` }
                  );
                  req.user = {
                    userEmail: replacedEmail,
                    username: usernamePayment,
                    text: `We are pleased to inform you that your payment (id; ${result._id}) has been successfully processed. Thank you for your purchase and for choosing our services. If you have any questions or need further assistance, please don't hesitate to contact our support team.`,
                    subject: "Payment Successful",
                    result_id: result._id,
                  };
                  next();
                })
                .catch((error) =>
                  res.status(500).send({ error: error.message })
                );
            });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
}
export const vnpayReturn =async (req, res, next)=> {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;

  //  let querystring = require("qs");
  let signData = qs.stringify(vnp_Params, { encode: false });
  // let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
}

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
  export function haveDonePayment(req, res) {
    let nodeConfig = {
      service: "gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    let transporter = createTransport(nodeConfig);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Heart Beat",
        link: "heartbeat.com",
        logo: "https://png.pngtree.com/template/20191108/ourmid/pngtree-yoga-logo-design-stock-meditation-in-lotus-flower-illustration-image_328924.jpg",
      },
    });
    const { username, userEmail, text, subject, result_id } = req.user;
    // body of the email
    var modifiedUsername = username.replace(/\+/g, " ");
    var email = {
      body: {
        name: modifiedUsername || "No Name",
        intro:
          text ||
          "Welcome to Yoga HeartBeat! We're very excited to have you join with us.",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    var emailBody = MailGenerator.generate(email);

    let message = {
      from: process.env.SMTP_USERNAME,
      to: userEmail,
      subject: subject || "Login Succesful",
      html: emailBody,
    };

    transporter
      .sendMail(message)
      .then(() => {
        const url = process.env.returnHome;
        res.redirect(url + "?pmid=" + result_id);
      })
      .catch((error) => res.status(500).send({ error }));
  }

//out put [
// {x:'month',y:'average'}
//
//]
export const charDataPayment = async(req, res) =>{
  const { month, year } = req.body;
  console.log(year);
  console.log(month);
  const today = new Date();
  const yearNow = today.getFullYear();
  const startDate = new Date(`${year || yearNow}-${month || "01"}-01`);
  const endDate = new Date(`${year || yearNow}-${month || "12"}-31`);
  endDate.setHours(23, 59, 59, 999);

  const paymentByYear = await _find({
    createdAt: { $gte: startDate, $lt: endDate },
  });

  let arrJan = { x: "Jan", y: 0 };
  let arrFeb = { x: "Feb", y: 0 };
  let arrMar = { x: "Mar", y: 0 };
  let arrApr = { x: "Apr", y: 0 };
  let arrMay = { x: "May", y: 0 };
  let arrJun = { x: "Jun", y: 0 };
  let arrJul = { x: "Jul", y: 0 };
  let arrAug = { x: "Aug", y: 0 };
  let arrSep = { x: "Sep", y: 0 };
  let arrOct = { x: "Oct", y: 0 };
  let arrNov = { x: "Nov", y: 0 };
  let arrDec = { x: "Dec", y: 0 };

  let arrJanNotPayment = { x: "Jan", y: 0 };
  let arrFebNotPayment = { x: "Feb", y: 0 };
  let arrMarNotPayment = { x: "Mar", y: 0 };
  let arrAprNotPayment = { x: "Apr", y: 0 };
  let arrMayNotPayment = { x: "May", y: 0 };
  let arrJunNotPayment = { x: "Jun", y: 0 };
  let arrJulNotPayment = { x: "Jul", y: 0 };
  let arrAugNotPayment = { x: "Aug", y: 0 };
  let arrSepNotPayment = { x: "Sep", y: 0 };
  let arrOctNotPayment = { x: "Oct", y: 0 };
  let arrNovNotPayment = { x: "Nov", y: 0 };
  let arrDecNotPayment = { x: "Dec", y: 0 };
  const result = paymentByYear.map((obj) => {
    let date = new Date(obj.createdAt);
    let month = date.getMonth() + 1;
    if (obj.paymentAmount != 0) {
      let amount = obj.paymentAmount / 1000000;
      switch (month) {
        case 1:
          if (obj.status !== 10) {
            Object.assign(arrJanNotPayment, {
              x: "Jan",
              y: amount + arrJanNotPayment.y,
            });
            break;
          }
          Object.assign(arrJan, {
            x: "Jan",
            y: amount + arrJan.y,
          });
          break;
        case 2:
          if (obj.status !== 10) {
            Object.assign(arrFebNotPayment, {
              x: "Feb",
              y: amount + arrFebNotPayment.y,
            });
            break;
          }
          Object.assign(arrFeb, {
            x: "Feb",
            y: amount + arrFeb.y,
          });
          break;
        case 3:
          if (obj.status !== 10) {
            Object.assign(arrMarNotPayment, {
              x: "Mar",
              y: amount + arrMarNotPayment.y,
            });
            break;
          }
          Object.assign(arrMar, {
            x: "Mar",
            y: amount + arrMar.y,
          });
          break;
        case 4:
          if (obj.status !== 10) {
            Object.assign(arrAprNotPayment, {
              x: "Apr",
              y: amount + arrAprNotPayment.y,
            });
            break;
          }
          Object.assign(arrApr, {
            x: "Apr",
            y: amount + arrApr.y,
          });
          break;
        case 5:
          if (obj.status !== 10) {
            Object.assign(arrMayNotPayment, {
              x: "May",
              y: amount + arrMayNotPayment.y,
            });
            break;
          }
          Object.assign(arrMay, {
            x: "May",
            y: amount + arrMay.y,
          });
          break;
        case 6:
          if (obj.status !== 10) {
            Object.assign(arrJunNotPayment, {
              x: "Jun",
              y: amount + arrJunNotPayment.y,
            });
            break;
          }
          Object.assign(arrJun, {
            x: "Jun",
            y: amount + arrJun.y,
          });
          break;
        case 7:
          if (obj.status !== 10) {
            Object.assign(arrJulNotPayment, {
              x: "Jul",
              y: amount + arrJulNotPayment.y,
            });
            break;
          }
          Object.assign(arrJul, {
            x: "Jul",
            y: amount + arrJul.y,
          });
          break;
        case 8:
          if (obj.status !== 10) {
            Object.assign(arrAugNotPayment, {
              x: "Aug",
              y: amount + arrAugNotPayment.y,
            });
            break;
          }
          Object.assign(arrAug, {
            x: "Aug",
            y: amount + arrAug.y,
          });
          break;
        case 9:
          if (obj.status !== 10) {
            Object.assign(arrSepNotPayment, {
              x: "Sep",
              y: amount + arrSepNotPayment.y,
            });
            break;
          }
          Object.assign(arrSep, {
            x: "Sep",
            y: amount + arrSep.y,
          });
          break;
        case 10:
          if (obj.status !== 10) {
            Object.assign(arrOctNotPayment, {
              x: "Oct",
              y: amount + arrOctNotPayment.y,
            });
            break;
          }
          Object.assign(arrOct, {
            x: "Oct",
            y: amount + arrOct.y,
          });
          break;
        case 11:
          if (obj.status !== 10) {
            Object.assign(arrNovNotPayment, {
              x: "Nov",
              y: amount + arrNovNotPayment.y,
            });
            break;
          }
          Object.assign(arrNov, {
            x: "Nov",
            y: amount + arrNov.y,
          });
          break;
        case 12:
          if (obj.status !== 10) {
            Object.assign(arrDecNotPayment, {
              x: "Dec",
              y: amount + arrDecNotPayment.y,
            });
            break;
          }
          Object.assign(arrDec, {
            x: "Dec",
            y: amount + arrDec.y,
          });
          break;
        default:
          break;
      }
    }
  });
  // let max_y = 0;

  // result.forEach((array) => {
  //   array.forEach((item) => {
  //     if (item.y > max_y) {
  //       max_y = item.y;
  //     }
  //   });
  // });
  const chartData = [
    arrJan,
    arrFeb,
    arrMar,
    arrApr,
    arrMay,
    arrJun,
    arrJul,
    arrAug,
    arrSep,
    arrOct,
    arrNov,
    arrDec,
  ];

  const chartData2 = [
    arrJanNotPayment,
    arrFebNotPayment,
    arrMarNotPayment,
    arrAprNotPayment,
    arrMayNotPayment,
    arrJunNotPayment,
    arrJulNotPayment,
    arrAugNotPayment,
    arrSepNotPayment,
    arrOctNotPayment,
    arrNovNotPayment,
    arrDecNotPayment,
  ];

  let maxY = Number.NEGATIVE_INFINITY;
  const lengthData = chartData.length;
  for (let i = 0; i < lengthData; i++) {
    const point = chartData[i];
    if (point.y > maxY) {
      maxY = point.y;
    }
  }

  let totalSum = 0;

  // Iterate through the array and add up the "y" values
  for (let i = 0; i < chartData.length; i++) {
    totalSum += chartData[i].y;
  }

  let totalSumNotPaid = 0;
  for (let i = 0; i < chartData2.length; i++) {
    totalSumNotPaid += chartData2[i].y;
  }

  res.status(201).send({
    data: [chartData, chartData2],
    maxium: maxY,
    total: totalSum,
    totalNotPaid: totalSumNotPaid,
  });
}

export const charDataPaymentPremium = async(req, res) =>{
  try {
    //output {amount:value,percentage:% }
    const today = new Date();
    const yearNow = today.getFullYear();
    const month = today.getMonth() + 1;
    const startDate = new Date(`${yearNow}-${month}-01`);
    const endDate = new Date(`${yearNow}-${month}-31`);
    endDate.setHours(23, 59, 59, 999);

    const startDateLast = new Date(`${yearNow}-${month - 1}-01`);
    const endDateLast = new Date(`${yearNow}-${month - 1}-31`);
    endDateLast.setHours(23, 59, 59, 999);

    const userByMonth = _find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    const userByLastMonth = _find({
      createdAt: { $gte: startDateLast, $lt: endDateLast },
    });

    let [DataMonth, DataLastMonth] = await Promise.all([
      userByMonth,
      userByLastMonth,
    ]);
    const currentMonthCount = DataMonth.length;
    const previousMonthCount = DataLastMonth.length;
    let percentage;
    if (currentMonthCount - previousMonthCount < 0) {
      percentage = (
        Math.abs(
          (currentMonthCount - previousMonthCount) /
            (previousMonthCount === 0 ? currentMonthCount : previousMonthCount)
        ) * 100
      )
        .toFixed(2)
        .toString();
      percentage = "-" + percentage;
    } else {
      percentage = (
        Math.abs(
          (currentMonthCount - previousMonthCount) /
            (previousMonthCount === 0 ? currentMonthCount : previousMonthCount)
        ) * 100
      )
        .toFixed(2)
        .toString();
      percentage = "+" + percentage;
    }
    //////
    let currentMonthIncome = 0;
    let previousMonthIncome = 0;

    for (let i = 0; i < DataMonth.length; i++) {
      currentMonthIncome += DataMonth[i].paymentAmount;
    }

    for (let i = 0; i < DataLastMonth.length; i++) {
      previousMonthIncome += DataLastMonth[i].paymentAmount;
    }
    let percentage2;
    const difference = currentMonthIncome - previousMonthIncome;
    const previousMonthIncomeAdjusted =
      previousMonthIncome === 0 ? currentMonthIncome : previousMonthIncome;
    if (difference < 0) {
      percentage2 = ((Math.abs(difference) / previousMonthIncomeAdjusted) * 100)
        .toFixed(2)
        .toString();
      percentage2 = "-" + percentage2;
    } else {
      percentage2 = ((Math.abs(difference) / previousMonthIncomeAdjusted) * 100)
        .toFixed(2)
        .toString();
      percentage2 = "+" + percentage2;
    }

    res.status(201).send([
      { amount: DataMonth.length, percentage: percentage + "%" },
      { amount: currentMonthIncome / 1000000, percentage: percentage2 + "%" },
    ]);
  } catch (error) {
    return res.status(404).send({ error });
  }
}

export const charDataPaymentPremiumLineChart = async(req, res)=> {
  try {
    const arrTemp = [];
    const arrName = [];
    const arrCreateAt = [];
    const getPremium = await ___find();
    const lengthPremium = getPremium.length;
    for (let index = 0; index < lengthPremium; index++) {
      const item = getPremium[index];
      const idPremium = item._id;
      const getPremiumOnPayment = await _find({ premium_id: idPremium });
      const lengthPrePay = getPremiumOnPayment.length;
      for (let j = 0; j < lengthPrePay; j++) {
        let itemTemp = getPremiumOnPayment[j].createdAt.getMonth() + 1;
        let prename = item.premiumname;
        arrCreateAt.push({ [prename]: itemTemp });
      }
    }
    const uniqueData = removeDuplicateKeyValuePairs(arrCreateAt);
    const lengthData = uniqueData.length;

    const today = new Date();
    const yearNow = today.getFullYear();
    const arrNameData = [];
    const arrData = [];
    for (let i = 0; i < lengthData; i++) {
      const startDate = new Date(
        `${yearNow}-${uniqueData[i][Object.keys(uniqueData[i])[0]]}-01`
      );
      const endDate = new Date(
        `${yearNow}-${uniqueData[i][Object.keys(uniqueData[i])[0]]}-31`
      );

      endDate.setHours(23, 59, 59, 999);
      const premiumName = Object.keys(uniqueData[i])[0];
      const premium = await findOne({ premiumname: premiumName });
      const idPremium = premium._id;
      arrNameData.push({ [idPremium]: premiumName });
      const dataSourceTemp = await _find({
        createdAt: { $gte: startDate, $lt: endDate },
        premium_id: premium._id,
      });
      arrData.push(dataSourceTemp);
    }
    //{name:Free Trial, dataSource : [{x:date,y:value},{}]}
    //
    const arrDataSource = [];
    const arrDataResult = [];
    const total = arrData.length;
    for (let index = 0; index < total; index++) {
      let obj = {};
      let objname = {};
      const month = arrData[index][0].createdAt.getMonth();
      const newDate = new Date(yearNow, month, 1);
      const premium_name = Object.values(arrNameData[index])[0];
      let value = arrData[index].length;
      Object.assign(obj, { x: newDate, y: (value / total) * 100 });
      arrDataSource.push({ name: premium_name, dataSource: [obj] });
    }

    const data = combineDataSourceByName(arrDataSource);
    res.status(201).send(data);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
}

const combineDataSourceByName = (data) => {
  const combinedData = [];

  data.forEach((item) => {
    const existingItem = combinedData.find((entry) => entry.name === item.name);

    if (existingItem) {
      existingItem.dataSource.push(...item.dataSource);
    } else {
      combinedData.push({ name: item.name, dataSource: [...item.dataSource] });
    }
  });

  return combinedData;
};

export const getPaymentByIdUser = async (req, res)=> {
  try {
    const arrTemp = [];
    const account = req.account; //chuyển qa cho thg tiếp theo
    const getBookingByUserID = await __find({
      member_id: account.userId,
    });
    const length = getBookingByUserID.length;
    console.log(getBookingByUserID);
    for (var i = 0; i < length; i++) {
      const bookingID = getBookingByUserID[i]._id;
      const getPaymentByUserID = await _find({ booking_id: bookingID });
      for (var index = 0; index < getPaymentByUserID.length; index++) {
        arrTemp.push(getPaymentByUserID[index]);
      }
    }
    return res.status(201).send(arrTemp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function removeDuplicateKeyValuePairs(arr) {
  const uniquePairs = {};

  arr.forEach((obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    const pair = `${key}:${value}`;

    if (!uniquePairs.hasOwnProperty(pair)) {
      uniquePairs[pair] = obj;
    }
  });

  return Object.values(uniquePairs);
}