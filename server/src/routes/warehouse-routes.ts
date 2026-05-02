import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import { createWarehouse, getWarehouseById, deleteWarehouseById, updateWarehouseById } from "../controllers/warehouse-controller";

const router = Router();

router.post("/", requireAuth, createWarehouse);
router.get("/:id", requireAuth, getWarehouseById);
router.post("/:id", requireAuth, updateWarehouseById);
router.delete("/:id", requireAuth, deleteWarehouseById);

export default router;