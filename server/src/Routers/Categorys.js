import express from "express";
import { create,getCategoryBySlug,deleteCategory,getAllcategory,updateCategory,getCategoryCourse,getCategoryById } from '../controllers/category';
import { authenticate } from "../Middlewares/authenticate";
import { authorization } from "../Middlewares/authorization";



const router = express.Router();

router.get("/categories", getAllcategory);
router.get("/categories/:id", getCategoryById);
router.get("/categories/:slug", getCategoryBySlug)
router.post("/categories",authenticate, authorization, create)
router.put("/categories/:id", authenticate, authorization, updateCategory)
router.delete("/categories/:id", authenticate, authorization, deleteCategory)
router.get("/categories/:id/courseData", getCategoryCourse)

export default router;