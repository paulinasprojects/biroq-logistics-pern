import { Router } from "express";
import { login, registerUser } from "../controllers/user-controller";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);

export default router;