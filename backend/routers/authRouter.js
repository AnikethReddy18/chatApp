import { Router } from "express";
import { loginController, signupController, signupValidatiors } from "../controllers/authController.js";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signupValidatiors,signupController);

export default router;