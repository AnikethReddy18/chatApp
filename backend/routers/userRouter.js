import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js"
import { getUserDetails, updateUserPFPController} from "../controllers/userController.js";

const router = Router();

router.get("/user/:username", getUserDetails)
router.put("/user/:username/pfp", verifyToken, updateUserPFPController)

export default router;