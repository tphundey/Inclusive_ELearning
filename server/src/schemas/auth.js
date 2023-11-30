// import joi from "joi";

// export const signupSchema = joi.object({
//  name: joi.string(),
//   email: joi.string().email().required().messages({
//     "string.email": "Email không đúng định dạng",
//     "string.empty": "Email không được để trống",
    
//   }),
//   passWord: joi.string().required().min(6).messages({
//     "string.min": "Password phải có ít nhất {#limit} ký tự",
//     "string.empty": "Password không được để trống",
    
//   }),
//   location: joi.string().required(),
//   avata: joi.string().required()
// });

// export const signinSchema = joi.object({
//   email: joi.string().email().required().messages({
//     "string.email": "Email không đúng định dạng",
//     "string.empty": "Email không được để trống",
//     "any.required": "Trường email là bắt buộc",
//   }),
//   passWord: joi.string().required().min(6).messages({
//     "string.min": "Password phải có ít nhất {#limit} ký tự",
//     "string.empty": "Password không được để trống",
//     "any.required": "Trường Password là bắt buộc",
//   }),
// });
