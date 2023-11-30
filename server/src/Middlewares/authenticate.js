// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import User from "../models/user";

// dotenv.config();

// export const authenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(400).json({
//         message: "Bạn phải đăng nhập để thực hiện hành động này",
//       });
//     }

//     const token = authHeader.split(" ")[1];
//     const secretKey = process.env.SECRET_KEY;

//     jwt.verify(token, secretKey, async (error, payload) => {
//       if (error) {
//         if (error.name === "JsonWebTokenError") {
//           return res.status(401).json({
//             message: "Token không hợp lệ",
//           });
//         }
//         if (error.name == "TokenExpiredError") {
//           return res.status(401).json({
//             message: "Token hết hạn",
//           });
//         }
//       }

//       const user = await User.findById(payload._id);
//       if (!user) {
//         return res.status(400).json({
//           message: "Không tìm tháy người dùng",
//         });
//       }
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     return res.status(401).json({
//       message: error.message,
//     });
//   }
// };
