import { Router } from "express";
import authGuard from "../auth/auth-guard.js";
import paymentController from "./payment-controller.js";

const paymentRouter = Router();
paymentRouter.post("/start", authGuard, paymentController.start);

export default paymentRouter;
