import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dut2gymbb",
    api_key: "447885367917838",
    api_secret: "Lm5YbRUtPCuXYjt9jDeEBEBVHQ0",
});

export default cloudinary;
