import express from "express";
import { deleteImage, uploadImage, uploadVideo } from "../controllers/uploader";
import { uploadMulter,  } from "../Middlewares/uploader";
const router = express.Router();

router.post("/images/upload", uploadMulter.array("images",10), uploadImage);
router.post("/video/upload", uploadMulter.array("videos",10), uploadVideo);
router.delete("/images/:publicId", deleteImage);

export default router;
