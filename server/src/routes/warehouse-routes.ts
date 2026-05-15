import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import { createWarehouse, getAllWarehouses, getWarehouseById, deleteWarehouseById, updateWarehouseById, createeWarehouseImage } from "../controllers/warehouse-controller";
import { cloudinaryUpload } from "../utils/cloudinary-upload";

const router = Router();

router.post("/", requireAuth, createWarehouse);
router.post("/:id/image", requireAuth, cloudinaryUpload.single("image"), createeWarehouseImage)
router.get("/", requireAuth, getAllWarehouses);
router.get("/:id", requireAuth, getWarehouseById);
router.post("/:id", requireAuth, updateWarehouseById);
router.delete("/:id", requireAuth, deleteWarehouseById);

export default router;