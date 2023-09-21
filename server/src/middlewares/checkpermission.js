import jwt from "jsonwebtoken";
import User from "../models/user"

export const checkPermission = async (req, res, next) => {
    try {
        //kiểm tra xem chúng ta đã đăng nhập hay chưa
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập",
            });
        }
        //lấy token ấy bằng thằng authorrization 
        const token = req.headers.authorization.split(" ")[1];
        //verify thằng token ấy có hợp lệ hay không 
        const { id } = jwt.verify(token, "123456");
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập tài nguyên này",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.json({
                message: "Token không hợp lệ",
            });
        }
        return res.status(400).json({
            message: error.message
        })
    }

};