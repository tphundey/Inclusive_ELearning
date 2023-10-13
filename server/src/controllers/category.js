import Category from "../models/category";
import course from "../models/course";

import { categorySchema, categoryUpdateSchema } from '../schemas/category';
import slugify from "slugify";

export const getAllcategory = async (req, res) => {
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
    // Tìm kiếm dữ liệu
    const searchData = (categories) => {
      return categories?.docs?.filter((item) =>
        item?.category_name?.toLowerCase().includes(_keywords)
      );
    };
    const categories = await Category.paginate({}, option);
    if (!categories.docs || categories.docs.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    const searchDataCate = await searchData(categories);
    const CategoryResponse = await { ...categories, docs: searchDataCate };

    res.status(200).json({
      message: "Lấy danh mục thành công ",
      categories,
      CategoryResponse,
      pagination: {
        currentPage: categories.page,
        totalPages: categories.totalPages,
        totalItems: categories.totalDocs,
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category || category.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({ message: "lấy danh mục thành công", category });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getCategoryBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const data = await Category.findOne({ slug });
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};
export const create = async (req, res) => {
  const { name } = req.body;
  const formData = req.body;
  try {
    const data = await Category.findOne({ name });
    if (data) {
      return res.status(400).json({
        message: "danh mục đã tồn tại",
      });
    }
    // validate
    const { error } = categorySchema.validate(formData);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const category = await Category.create(formData);
    if (!category || category.length === 0) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Xóa tất cả sản phẩm thuộc danh mục
    await course.deleteMany({ categoryId });

    // Xóa danh mục
    const category = await Category.findByIdAndDelete(categoryId);

    return res.json({
      message: "Xóa danh mục thành công!",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  const formData = req.body;
  try {
    const { error } = categoryUpdateSchema.validate(formData, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const newSlug = slugify(name, { lower: true });

    const category = await Category.findByIdAndUpdate(
      id,
      { ...formData, slug: newSlug },
      {
        new: true,
      }
    );
    if (!category || category.length == 0) {
      return res.status(400).json({
        message: "không tìm thấy danh mục",
      });
    }
    return res.json({ message: "sửa danh mục thành công", category });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getCategoryCourse = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).populate("courseData");

    if (!category) {
      return res.status(400).json({
        message: "Không tìm thấy danh mục",
      });
    }

    const courseData = category.courseData;
    return res.json({
      message: "Lấy danh sách sản phẩm theo danh mục thành công",
      courseData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
