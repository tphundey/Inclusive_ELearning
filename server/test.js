const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productsRouter = require('./products');
const cartRouter = require('./cart');
const googleAccountRouter = require('./googleAccount');
const invoiceRouter = require('./invoice');
const reviewRouter = require('./reviews');
const categoryRouter = require('./categories');
const router = express.Router();
const path = require('path');
const moment = require('moment');
const mongoDBUrl = "mongodb+srv://root:123@cluster0.zq6tyry.mongodb.net/thuctap?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("Connected to MongoDB Atlas!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/googleAccount', googleAccountRouter);
app.use('/hoadon', invoiceRouter);
app.use('/categories', categoryRouter);
app.use('/reviews', reviewRouter);

app.set('views', path.join(__dirname, 'views'));  // Set the views directory
app.set('view engine', 'jade');  // Set the view engine to Jade

const fs = require('fs');
const fetch = require('node-fetch');
const { log } = require('console');

app.post('/saveOrder', (req, res) => {
    const { orderId, amount } = req.body;

    // Ghi orderId và amount vào tệp tin
    const orderData = `OrderId: ${orderId}, Amount: ${amount}\n`;
    fs.appendFileSync('order.txt', orderData);

    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/order', (req, res) => {
    try {
        // Đọc nội dung của file order.txt
        const orderData = fs.readFileSync('order.txt', 'utf-8');
        const lines = orderData.split('\n');
        const lastLine = lines[lines.length - 2]; // Lấy dòng trước dòng trắng cuối cùng
        const match = lastLine.match(/Amount: (\d+)/);
        let amount = match ? match[1] : 1000; // Nếu không tìm thấy, mặc định là 1000
        amount += '000';

        // Truyền dữ liệu cần thiết cho trang order.jade
        res.render('order', { title: 'Thông tin thanh toán', amount });
    } catch (error) {
        console.error('Error rendering order.jade:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/create_payment_url', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let config = require('config');

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;

    let locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.redirect(vnpUrl)
});


app.get('/order/vnpay_return', async function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    const amountPaid = vnp_Params['vnp_Amount'] / 100; // Chia cho 100 vì đã nhân 100 ở phần tạo thanh toán

    if (secureHash === signed) {
        const responseCode = vnp_Params['vnp_ResponseCode'];
        if (responseCode === '00') {
            // Giao dịch thành công, cập nhật hóa đơn
            const orderIdFilePath = 'order.txt';
            const orderId = fs.readFileSync(orderIdFilePath, 'utf-8').trim();

            // Thực hiện yêu cầu cập nhật hóa đơn thông qua API
            try {
                const updateResponse = await fetch(`http://localhost:3000/hoadon/${orderId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers if needed
                    },
                    body: JSON.stringify({
                        paymentStatus: 'Đã thanh toán',
                        amountDone: amountPaid, // Thêm giá trị amount
                        // Các trường khác cần cập nhật
                    }),
                });

                if (updateResponse.ok) {
                    // Cập nhật thành công, hiển thị trang success
                    res.render('success', { code: responseCode });
                } else {
                    // Xử lý lỗi khi không cập nhật được
                    res.render('success', { code: '97' });
                }
            } catch (error) {
                // Xử lý lỗi khi có lỗi trong quá trình yêu cầu API
                res.render('success', { code: '97' });
            }
        } else {
            // Trạng thái giao dịch không phải là thành công
            res.render('success', { code: responseCode });
        }
    } else {
        // Hash không khớp, xem xét xử lý lỗi tại đây
        res.render('success', { code: '97' });
    }
});



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

// Vui lòng tham khảo thêm tại code demo
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
