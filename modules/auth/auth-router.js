import { Router } from "express";
import authController from "./auth-controller.js";

const authRouter = Router();
authRouter.post("/send-otp", authController.sendOtp);
authRouter.post("/check-otp", authController.checkOtp);
authRouter.post("/refresh-token", authController.verifyRefreshToken);

export default authRouter;
