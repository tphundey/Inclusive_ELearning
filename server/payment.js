// Tạo file payment.js trong cùng thư mục với các router khác
const express = require('express');
const router = express.Router();
const vnpay = require('vnpay');

// Khai báo các thông tin của tài khoản VNPAY của bạn
const vnp_HashSecret = 'VRWDUINOYPVCKNVKRDXRRBXGOGNMIKUI';
const vnp_TmnCode = '3CPTW6IZ';

// Endpoint để xử lý yêu cầu thanh toán
router.post('/create-payment', (req, res) => {
  const { vnp_OrderInfo, vnp_Amount } = req.body;

  // Tạo đối tượng VNPAY
  const vnp = new vnpay({
    vnp_TmnCode,
    vnp_HashSecret,
  });

  // Tạo các tham số cho yêu cầu thanh toán
  const returnUrl = 'http://localhost:3000/vnpay-return'; // Đường dẫn trả về sau khi thanh toán
  const orderUrl = vnp.buildPaymentUrl({
    vnp_OrderInfo,
    vnp_Amount,
    vnp_ReturnUrl: returnUrl,
  });

  // Trả về đường dẫn thanh toán cho trang React
  res.json({ redirectUrl: orderUrl });
  res.redirect(orderUrl);
});

module.exports = router;
