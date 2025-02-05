import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { sendMessageController } from "../controllers/messageController.js";

const router = Router();

router.post("/message", verifyToken, sendMessageController);

export default router;