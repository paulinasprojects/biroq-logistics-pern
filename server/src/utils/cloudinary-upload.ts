import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "warehouses",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      { width: 1200, height: 800, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  } as object,
});

export const cloudinaryUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only jpg, jpeg, png and webp images are allowed"));
    }
  },
});

export const deleteCloudinaryImage = async (imageUrl: string): Promise<void> => {
  try {
    const parts = imageUrl.split("/");
    const fileWithExt = parts[parts.length - 1];
    const publicFileName = fileWithExt.split(".")[0];
    const folder = parts[parts.length - 2];
    const publicId = `${folder}/${publicFileName}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
      console.error("Delete cloudinary failed to delete old image: ", error);
  }
}

export default cloudinary;