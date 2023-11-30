import User from '../models/user';

export const searchUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length == 0) {
      return res.status(400).json();
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(401).json({
        message: "không tìm thấy tài khoản nào",
      });
    }
    const totalUser = await User.count();

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, formData, { new: true });
    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản",
      });
    }
    return res.status(200).json({
      message: "Cập nhật tài khoản thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const removeUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản",
      });
    }
    return res.json({
      message: "Xoá tài khoản thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
