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
import { authenticate } from "../Middlewares/authenticate";
import { authorization } from "../Middlewares/authorization";
const router = express.Router();

router.get("/courses", getAllCourse);
router.get("/course/:slug/:id",getCourseBySlug);
router.get("/courses/:id", getCourseById)
router.post("/courses", authenticate,authorization, createCourse);
router.patch("/courses/:id", authenticate,authorization, updateCourse);
router.delete("/courses/:id", authenticate,authorization, deleteCourse);
router.get("/courses/categoryId/:id", authenticate,authorization, getCourseByIdCategory)

export default router;
