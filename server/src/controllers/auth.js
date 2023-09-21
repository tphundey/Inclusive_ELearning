import User from '../models/user'
import bcrypt from 'bcryptjs';
import { signupSchema, siginSchema } from '../Schemas/auth';
import jwt from 'jsonwebtoken';
//Đăng kí
export const signup = async (req, res) => {
    try {
        //validate tất cả các trường trước 
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        //nếu có lỗi tạo ra một cái mảng mới chứa tất cả các mesage này
        if (error) {
            const errors = error.details.map((err) => err.message);
            //trả về phía client
            return res.status(400).json({
                message: errors,
            });
        }
        // Kiểm tra xem user đã đk chưa?
        const userExist = await User.findOne({ email: req.body.email });
        //nếu đăng kí rồi thông báo trả ra cho client
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }
        //nếu chưa đăng kí chúng ta mã hóa mật khẩu bằng bcrypt
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //tạo một use mới chứa thông tin name,email từ phía client gửi lên 
        //có phần password sẽ lấy hashedpassword gắn vào 
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Tạo token
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });
        //sau khi tạo user xong trả về client và không bao gồm phần password
        // không trả về password
        user.password = undefined;

        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
//đăng nhập
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const { error } = siginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            })
        }
        //kiem tra xem user da dang ki chua 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status.json({
                message: "email không tồn tại"
            })
        }
        // so sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "mật khẩu không đúng"
            })
        }

        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" })

        user.password = undefined
        return res.status(200).json({
            message: "dang nhap thanh cong",
            accessToken: token,
            user
        })



    } catch (error) {

        return res.status(400).json({
            message: error
        })

    }

}




