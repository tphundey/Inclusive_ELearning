import cloudinary from "../configs/cloudinary";

export const uploadImage = async (req, res) => {
    const images = req.files.map((file) => file.path);

    const uploadedImages = [];
    for (const image of images) {
        try {
            const result = await cloudinary.uploader.upload(image);
            uploadedImages.push({ url: result.secure_url, publicId: result.public_id });
        } catch (error) {
            console.log(error);
        }
    }
    return res.json({ urls: uploadedImages });
};

export const deleteImage = async (req, res) => {
    const publicId = req.params.publicId;
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        res.status(200).json({ message: "Xóa ảnh thành công", ...result });
    } catch (error) {
        res.status(500).json({ error: "Error deleting image" });
    }
};
