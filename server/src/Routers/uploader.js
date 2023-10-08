import express from "express";
import { deleteImage, uploadImage } from "../controllers/uploader";
import { uploadMulter } from "../Middlewares/uploader";
const router = express.Router();

router.post("/images/upload", uploadMulter.array("images",10), uploadImage);
router.delete("/images/:publicId", deleteImage);

export default router;
