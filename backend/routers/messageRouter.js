import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { sendMessageController, getMessagesController } from "../controllers/messageController.js";

const router = Router();

router.get("/message", verifyToken, getMessagesController)
router.post("/message", verifyToken, sendMessageController);

export default router;