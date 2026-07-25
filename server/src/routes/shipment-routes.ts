import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipmentById,
  deleteShipmentById,
} from "../controllers/shipment-controller";

const router = Router();

router.get("/",      requireAuth, getAllShipments);
router.get("/:id",   requireAuth, getShipmentById);
router.post("/",     requireAuth, createShipment);
router.patch("/:id", requireAuth, updateShipmentById);
router.delete("/:id", requireAuth, deleteShipmentById);

export default router;