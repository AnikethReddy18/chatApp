import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js"
import { getUserDetails, updateUserDetails} from "../controllers/userController.js";

const router = Router();

router.get("/user/:username", verifyToken, getUserDetails)
router.put("/user/:username", verifyToken, updateUserDetails)

export default router;