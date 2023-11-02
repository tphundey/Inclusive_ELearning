import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../configs/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ["jpg", "png","mp4"],
    params: {
        folder: "Inclusive_elearning",
    
    },
});

export const uploadMulter = multer({ storage: storage });
