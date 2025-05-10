import { Router } from "express";
import authGuard from "../auth/auth-guard.js";
import orderController from "./order-controller.js";

const orderRouter = Router();

orderRouter.get("/", authGuard, orderController.getMyOrders);
orderRouter.get("/:id", authGuard, orderController.get);

orderRouter.patch(
  "/set-packed/:id",
  authGuard,
  orderController.setPackedStatus
);

orderRouter.patch(
  "/set-in-transit/:id",
  authGuard,
  orderController.setInTransitStatus
);

orderRouter.patch(
  "/set-delivered/:id",
  authGuard,
  orderController.setDeliveredStatus
);

orderRouter.patch("/cancel/:id", authGuard, orderController.cancelStatus);

export default orderRouter;
