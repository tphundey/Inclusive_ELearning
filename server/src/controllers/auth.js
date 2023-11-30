// import User from "../models/user";
// import bcrypt from "bcryptjs";
// import jwt, { sign } from "jsonwebtoken";
// import dotenv from "dotenv";
// import { generalAccessToken, generalRefreshToken } from "../services/jwtService";
// import { signinSchema, signupSchema } from "../schemas/auth";
// dotenv.config();

// export const login = async (req, res) => {
//   try {
//     // VALIDATE
//     const { error } = signinSchema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const errors = error.details.map((err) => err.message);
//       return res.status(400).json({
//         message: errors,
//       });
//     }

//     const {email, passWord } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Tài khoản không tồn tại",
//       });
//     }

//     const isMatch = await bcrypt.compare(passWord, user.passWord);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Mật khẩu không tồn tại",
//       });
//     }

    
//     const accessToken = generalAccessToken({
//       _id: user._id,
//       email,
//       name: user.name,
//       avata: user.avata,
//       role: user.role,
//     });

//     await user.save();
//     return res.status(200).json({
//       message: "Đăng nhập thành công",
//       accessToken,
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const register = async (req, res) => {
//   try {
//     const { email, passWord, name, avata,location } =
//       req.body;

//     // VALIDATE
//     const { error } = signupSchema.validate(req.body, { abortEarly: false });
//     if (error) {
//       const errors = error.details.map((err) => err.message);
//       return res.status(400).json({
//         message: errors,
//       });
//     }

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({
//         message: "Email đã tồn tại",
//       });
//     }

//     const hashPassword = await bcrypt.hash(passWord, 10);

//     const user = await User.create({
//       email,
//       name,
//       location,
//       avata,
//       passWord: hashPassword, 
//     });
  
//     const accessToken = generalAccessToken({
//       _id: user.id,
//       email: user.email,
//       name: user.name,
//       avata: user.avata,
//       role: user.role,
//     });
    
//     return res.json({
//       message: "Đăng ký thành công",
//       user,
//       accessToken,
//     })
    
//   } catch (error) {
//     return res.status(500).json({
//       message:error.message
//       // "dang ky khong thanh cong",
     
//     });
//   }
// };


// export const refreshToken = async (req, res) => {
//   try {
    
//     const token = req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return res.status(400).json({
//         message: "không tìm thấy token. Vui lòng đăng nhập lại",
//       });
//     }

  
//     const { payload } = refreshTokenService(token);

    
//     const accessToken = generalAccessToken(payload);
//     return res.status(200).json({
//       message: "Refresh access token successfully!",
//       accessToken,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };
