import express from "express";
import {
  getAllVideo,
  getVideoById,
  getVideoBySlug,
  create,
  deleteVideo,
  updateVideo,
  getVideoCourse,
} from "../controllers/video";

const router = express.Router();
router.get("/videos", getAllVideo);
router.get("/videos/:id", getVideoById);
router.get("/videos/:slug", getVideoBySlug);
router.post("/videos", create);
router.patch("/videos/:id", updateVideo);
router.delete("/videos/:id", deleteVideo);
router.get("/videos/courseId/:id", getVideoCourse);

export default router;
