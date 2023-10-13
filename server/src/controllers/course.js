import Course from "../models/course";
import { courseSchema } from "../schemas/course";
import slugify from "slugify";
import Category from "../models/category";
import dotenv from "dotenv";
dotenv.config;

export const getAllCourse = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createAt",
    _oder = "asc",
    _keyword = "",
  } = req.query;

  const option = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _oder === "desc" ? 1 : -1,
    },
  };
  try {
    //seach
    const searchData = (courseData) => {
      return courseData?.docs?.filter((item) =>
        item?.name?.toLowerCase().includes(_keyword)
      );
    };

    const courseData = await Course.paginate({}, option);
    if (!courseData.docs || courseData.docs.length == 0) {
      return res.status(400).json({
        message: "khong tim thay san pham!",
      });
    }
    const searchDataCourse = await searchData(courseData);

    const courseRespoonse = await { ...courseData, docs: searchDataCourse };

    return res.status(200).json({
      message: "lay khoa hoc thanh cong",
      courseRespoonse,
      pagination: {
        currentPage: courseData.page,
        totalPages: courseData.totalPages,
        totalItems: courseData.totalItems,
      },
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate([
      { path: "categoryId" },
      { path: "videoId" },
    ]);

    // const course = await Course.findById(req.params.id);
    // const category = await Category.findById(course.categoryId);

    // course.categoryId = category;

    if (!course || course.length == 0) {
      return res.status(404).json({
        message: "khong tim thay khoa hoc",
      });
    }
    res.status(200).json({
      message: "lay khoa hoc thanh cong",
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getCourseBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const course = await Course.findOne({ slug });
    if (!course || course.length === 0) {
      return res.status(404).json({
        message: "khong tim thay khoa hoc",
      });
    }
    return res.status(200).json({
      message: "lay khoa hoc thanh cong",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    // xoa khoa hoc
    const course = await Course.findByIdAndDelete(courseId);

    // Xoa khoa hoc khoi danh muc
    await Category.findByIdAndUpdate(course.categoryId, {
      $pull: { courseData: course._id },
    });

    return res.json({
      message: "xoa khoa hoc thanh cong",
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const createCourse = async (req, res) => {
  const { name } = req.body;
  const formData = req.body;

  try {
    const { error } = courseSchema.validate(formData);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    //kiem tra xem khoa hoc co hay chua
    const data = await Course.findOne({ name });
    if (data) {
      return res.status(400).json({
        message: "khoa hoc da ton tai trong he thong",
      });
    }
    const course = await Course.create(formData);
    if (!course || course.length == 0) {
      return res.status(400).json({
        message: "khong tim thay khoa hoc",
      });
    }
    await Category.findByIdAndUpdate(course.categoryId, {
      $addToSet: { courseData: course._id },
    });

    return res.status(201).json({
      message: "them khoa hoc thanh cong",
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const updateCourse = async (req, res) => {
  const formData = req.body;
  const id = req.params.id;
  const { name } = req.body;
  try {
    const { error } = courseSchema.validate(formData, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const newSlug = slugify(name, { lower: true });
    //lay lai category cu
    const oldData = await Course.findById(id);
    const oldCategory = await oldData.categoryId;

    //cap nhat khoa hoc
    const course = await Course.findByIdAndUpdate(
      id,
      { ...formData, slug: newSlug },
      { new: true }
    );

    //xoa khoa hoc o category cu
    await Category.findByIdAndUpdate(
      { _id: oldCategory },
      { $pull: { courseData: course._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(course.categoryId, {
      $addToSet: { courseData: course._id },
    });
    if (!course || course.length == 0) {
      return res.status(400).json({
        message: "khong tim thay khoa hoc",
      });
    }
    res.status(200).json({
      message: "cap nhat khoa hoc thanh cong",
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getCourseByIdCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const courseData = await Course.find({ categoryId: id });
    if (!courseData)
      return res.status(404).json({
        message: "khong tim thay khoa hoc nam trong danh muc nay ",
        success: false,
      });
    const courseResponse = await { docs: courseData };
    return res.status(200).json({
      message: "vai ca loz",
      success: true,
      courseResponse,
      pagination: {
        currentPage: courseData.page,
        totalPages: courseData.totalPages,
        totalItems: courseData.totalItems,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mes: error?.message,
    });
  }
};
