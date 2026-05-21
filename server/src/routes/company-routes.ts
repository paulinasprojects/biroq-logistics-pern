import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import { createCompany,createCompanyImage, getCompanyByUserId, updateCompanyById, deleteCompanyById, deleteCompanyImage } from "../controllers/company-controller";
import { companyUpload } from "../utils/cloudinary-upload";

const router = Router();

router.post("/", requireAuth, createCompany);
router.post("/:id/image", requireAuth, companyUpload.single("image"), createCompanyImage);
router.delete("/:id/image", requireAuth, deleteCompanyImage);
router.get("/", requireAuth, getCompanyByUserId);
router.post("/:id", requireAuth, updateCompanyById);
router.delete("/:id", requireAuth, deleteCompanyById)

export default router;