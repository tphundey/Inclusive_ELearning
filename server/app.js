const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const fetch = require('node-fetch');
const app = express();
const router = express.Router();
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');

const mongoDBUrl = "mongodb+srv://Graduation:123@cluster0.nzrddg9.mongodb.net/LinkedIn_Learning";
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dsk9jrxzf',
    api_key: '612129235538518',
    api_secret: 'FZkzoeuEcvkqDZmbiqrpmoKSEVA',

});

cloudinary.uploader.upload("https://s120-ava-talk.zadn.vn/f/1/7/8/139/120/c5debf8a117bcbf7a86ed9ab75f1dc10.jpg",
    { public_id: "olympic_flag" },
    function (error, result) {
        if (error) {
            console.error(error);
        } else {
            console.log(result);
        }
    }
);

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

const coursesController = require("./controllers/course");
const routerCate = require("./controllers/categories");
const routerGoogleAccounts = require("./controllers/googleAccount");
const routerPayments = require("./controllers/payment");
const routerPosts = require("./controllers/posts");
const routerReviews = require("./controllers/review");
const routerUserProgress = require("./controllers/userProgress");
const routerVideoProgress = require("./controllers/userVideoProgress");
const routerVideo = require("./controllers/video");
const routerNotes = require("./controllers/note");
const routerQuestions = require("./controllers/questions");
const routerCoupon = require("./controllers/coupon");




app.use("/Courses", coursesController);
app.use("/Categories", routerCate);
app.use("/googleAccount", routerGoogleAccounts);
app.use("/Payment", routerPayments);
app.use("/posts", routerPosts);
app.use("/Reviews", routerReviews);
app.use("/UserProgress", routerUserProgress);
app.use("/userVideoProgress", routerVideoProgress);
app.use("/Videos", routerVideo);
app.use("/Notes", routerNotes);
app.use("/Questions", routerQuestions);
app.use("/Coupons", routerCoupon);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Endpoint để hiển thị form upload


app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maitranthi651@gmail.com',
            pass: 'dinhtai2003',
        },
    });

    const mailOptions = {
        from: 'maitranthi651@gmail.com',
        to: 'taidvph20044@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email from Nodemailer.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Internal Server Error');
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Email sent successfully');
        }
      });
});
// Route chính
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/order', (req, res) => {
    try {
        const orderData = fs.readFileSync(path.join(__dirname, 'order.txt'), 'utf-8');
        const amountData = fs.readFileSync(path.join(__dirname, 'amount.txt'), 'utf-8');

        const orderLines = orderData.split('\n');
        const amountLines = amountData.split('\n');

        const lastOrderLine = orderLines[orderLines.length - 2];
        const lastAmountLine = amountLines[amountLines.length - 2];

        const orderId = lastOrderLine.trim(); // Lưu ý: Đây là id trực tiếp, không có tiền tố "OrderId:"
        const amount = parseFloat(lastAmountLine.trim()) || 0;
        res.render('order', { title: 'Thông tin thanh toán', orderId, amount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

app.post('/payment', (req, res) => {
    try {

        const amount = fs.readFileSync(path.join(__dirname, 'amount.txt'), 'utf-8');
        const courseId = fs.readFileSync(path.join(__dirname, 'course.txt'), 'utf-8');
        const userID = fs.readFileSync(path.join(__dirname, 'user.txt'), 'utf-8');
        // Ghi dữ liệu vào file amount.txt
        fs.writeFileSync(path.join(__dirname, 'amount.txt'), `${amount}\n`, { flag: 'a' });
        fs.writeFileSync(path.join(__dirname, 'course.txt'), `${courseId}\n`, { flag: 'a' });
        fs.writeFileSync(path.join(__dirname, 'user.txt'), `${userID}\n`, { flag: 'a' });
        // Trả về response
        res.status(200).json({ success: true, message: 'Payment successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
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


app.post('/saveOrder', (req, res) => {
    const { amount } = req.body;
    const { id } = req.body;
    const { userID } = req.body;

    const amountData = `${amount}\n`;
    const idData = `${id}\n`;
    const userIdData = `${userID}\n`;

    fs.writeFileSync('amount.txt', amountData);  // Ghi đè nội dung file, chỉ giữ lại amount cuối cùng
    fs.writeFileSync('user.txt', userIdData);
    fs.writeFileSync('course.txt', idData);
    res.sendStatus(200);
});

app.get('/order/vnpay_return', vnpayReturnHandler);

async function vnpayReturnHandler(req, res, next) {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];

        // Xóa các tham số không cần thiết
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sắp xếp lại tham số
        const sortedParams = sortObject(vnp_Params);

        const config = require('config');
        const tmnCode = config.get('vnp_TmnCode');
        const secretKey = config.get('vnp_HashSecret');

        const querystring = require('qs');
        const signData = querystring.stringify(sortedParams, { encode: false });
        const crypto = require("crypto");
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

        const amountPaid = vnp_Params['vnp_Amount'] / 100;

        if (secureHash === signed) {
            const responseCode = vnp_Params['vnp_ResponseCode'];
            // if (responseCode === '00') {
            //     const orderIdFilePath = 'order.txt';
            //     const orderId = fs.readFileSync(orderIdFilePath, 'utf-8').trim();

            //     try {
            //         if (responseCode) {
            //             res.render('success', { code: responseCode });
            //         } else {
            //             res.render('success', { code: '97' });
            //         }
            //     } catch (error) {
            //         res.render('success', { code: '97' });
            //     }
            // } else {
            //     res.render('success', { code: responseCode });
            // }
            if (responseCode === '00') {
                const courseIdFilePath = 'course.txt';
                const userIdFilePath = 'user.txt';
                const amountFilePath = 'amount.txt'

                // Đọc dữ liệu từ file và chuyển đổi thành số
                const courseId = fs.readFileSync(courseIdFilePath, 'utf-8').trim();
                const userId = fs.readFileSync(userIdFilePath, 'utf-8').trim();
                const rawAmount = fs.readFileSync(amountFilePath, 'utf-8').trim();

                // Chuyển đổi giá trị amount thành số
                const numericAmount = parseFloat(rawAmount.replace(/[^0-9.-]+/g, '')) || 0;

                try {
                    const updateResponse = await fetch(`http://localhost:3000/Payment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            paymentStatus: true,
                            courseId: courseId,
                            userId: userId,
                            amount: numericAmount
                        }),
                    });

                    if (updateResponse) {
                        res.render('success', { code: responseCode });
                    } else {
                        res.render('success', { code: '97' });
                    }
                } catch (error) {
                    res.render('success', { code: '97' });
                }
            } else {
                res.render('success', { code: responseCode });
            }
        } else {
            res.render('success', { code: '97' });
        }
    } catch (error) {
        console.error('Error handling VNPAY return:', error);
        res.status(500).send('Internal Server Error');
    }
}

function sortObject(obj) {
    let sorted = {};
    let str = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (let key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
