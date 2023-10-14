import dotenv from "dotenv";
import User from '../models/user';
dotenv.config();

export const searchUser = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
    _keywords = "",
  } = req.query;

  const option = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? 1 : -1,
    },
  };
  try {
    const searchData = (users) => {
      return users?.docs?.filter((item) =>
        item?.name?.toLowerCase().includes(_keywords)
      );
    };
    const users = await User.paginate({}, option);
    if (!users.docs || users.docs.length == 0) {
      return res.status(400).json({
        message: "không tìm thấy tài khoản",
      });
    }
    const searchDataUser = await searchData(users);
    const userResponse = await { ...users, docs: searchDataUser };

    res.status(200).json({
      message: "Lấy thành công ",
      userResponse,
      pagination: {
        currentPage: users.page,
        totalPages: users.totalPages,
        totalItems: users.totalDocs,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.findOne({});
    console.log(users);
    if (!users) {
      return res.status(401).json({
        message: "không tìm thấy tài khoản nào",
      });
    }
    const totalUser = await User.count();

    return res.status(200).json({
      success: true,
      users,
      totalUser,
    });
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
    return res.status(200).json({
      user,
      message: "Lấy tài khoản thành công",
    });
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
