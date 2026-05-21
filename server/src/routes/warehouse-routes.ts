import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import { createWarehouse, getAllWarehouses, getWarehouseById, deleteWarehouseById, updateWarehouseById, createWarehouseImage, deleteWarehouseImage } from "../controllers/warehouse-controller";
import { warehouseUpload } from "../utils/cloudinary-upload";

const router = Router();

router.post("/", requireAuth, createWarehouse);
router.post("/:id/image", requireAuth, warehouseUpload.single("image"), createWarehouseImage)
router.delete("/:id/image", requireAuth, deleteWarehouseImage);
router.get("/", requireAuth, getAllWarehouses);
router.get("/:id", requireAuth, getWarehouseById);
router.post("/:id", requireAuth, updateWarehouseById);
router.delete("/:id", requireAuth, deleteWarehouseById);

export default router;