import { Router } from "express";
import authController from "./auth-controller.js";

const authRouter = Router();
authRouter.post("/otp", authController.sendOtp);

export default authRouter;
