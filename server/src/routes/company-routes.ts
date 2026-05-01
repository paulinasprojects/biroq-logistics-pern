import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import { createCompany, getCompanyById, updateCompanyById, deleteCompanyById } from "../controllers/company-controller";

const router = Router();

router.post("/", requireAuth, createCompany);
router.get("/:id", requireAuth, getCompanyById);
router.post("/:id", requireAuth, updateCompanyById);
router.delete("/:id", requireAuth, deleteCompanyById)

export default router;