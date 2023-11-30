import express from "express";
import { create,getCategoryBySlug,deleteCategory,getAllcategory,updateCategory,getCategoryCourse,getCategoryById } from '../controllers/category';



const router = express.Router();

router.get("/categories", getAllcategory);
router.get("/categories/:id", getCategoryById);
router.get("/categories/:slug", getCategoryBySlug)
router.post("/categories", create)
router.put("/categories/:id",  updateCategory)
router.delete("/categories/:id",  deleteCategory)
router.get("/categories/:id/courseData", getCategoryCourse)

export default router;