import { Router } from "express";
import authGuard from "../auth/auth-guard.js";
import orderController from "./order-controller.js";

const orderRouter = Router();

orderRouter.get("/", authGuard, orderController.getMyOrders);
orderRouter.get("/:id", authGuard, orderController.get);

export default orderRouter;
