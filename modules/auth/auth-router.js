import { Router } from "express";
import authController from "./auth-controller.js";

const authRouter = Router();
authRouter.post("/send-otp", authController.sendOtp);
authRouter.post("/check-otp", authController.checkOtp);

export default authRouter;
