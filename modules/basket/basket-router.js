import { Router } from "express";
import authGuard from "../auth/auth-guard.js";
import basketController from "./basket-controller.js";

const basketRouter = Router();

basketRouter.get("/userId", authGuard, basketController.getUserBasket);
basketRouter.post("/upsert", authGuard, basketController.upsert);

export default basketRouter;
