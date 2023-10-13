import dotenv from "dotenv";

dotenv.config();

export const authorization = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(400).json({
        message: "Bạn không có quyền để thực hiện hành động này",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
