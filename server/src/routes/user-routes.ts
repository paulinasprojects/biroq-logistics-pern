import { Router } from "express";
import { login, registerUser, uploadUserImage, deleteUserImage } from "../controllers/user-controller";
import { avatarUpload } from "../utils/cloudinary-upload";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.post("/user/image", requireAuth, avatarUpload.single("image"), uploadUserImage);
router.delete("/user/image", requireAuth, deleteUserImage);

export default router;