import UserCheme from "../models/user";
import jwt from "jsonwebtoken";
export const CheckPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Bạn phải đăng nhập để thực hiện hanh động này");
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "13112003", async (error, payload) => {
      if (error) {
        if (error.name == "TokenExpiredError") {
          return res.json({
            message: "Token không hợp lệ",
          });
        }
        if (error.name == "JsonWebTokenError") {
          return res.json({
            message: "Xin vui lòng đăng nhập lại",
          });
        }
      }
      const user = await UserCheme.findById(payload._id);
      console.log(user);
      if (user && user.role !== "admin") {
        return res.json({
          message: "Bạn không đủ thẩm quyền để truy cập",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
