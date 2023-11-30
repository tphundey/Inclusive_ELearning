import express from "express";
import {
  createCourse,
  getAllCourse,
  getCourseById,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  getCourseByIdCategory,
} from "../controllers/course";
const router = express.Router();

router.get("/courses", getAllCourse);
router.get("/course/:slug/:id",getCourseBySlug);
router.get("/courses/:id", getCourseById)
router.post("/courses", createCourse);
router.patch("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);
router.get("/courses/categoryId/:id", getCourseByIdCategory)

export default router;
