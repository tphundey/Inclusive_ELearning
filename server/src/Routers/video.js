import express from "express";
import { getAllVideo,getVideoById,getVideoBySlug,create,deleteVideo,updateVideo,getVideoCourse } from '../controllers/video';
import { authenticate } from "../Middlewares/authenticate";
import { authorization } from "../Middlewares/authorization";

const router = express.Router();
router.get("/videos", getAllVideo);
router.get("/videos/:id", getVideoById)
router.get("/videos/:slug",getVideoBySlug);
router.post("/videos", authenticate,authorization, create);
router.patch("/videos/:id", authenticate,authorization, updateVideo);
router.delete("/videos/:id", authenticate,authorization, deleteVideo);
router.get("/videos/courseId/:id", authenticate,authorization, getVideoCourse)

export default router
