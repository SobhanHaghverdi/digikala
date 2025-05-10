import { Router } from "express";
import roleRouter from "./modules/role/role-router.js";
import authRouter from "./modules/auth/auth-router.js";
import orderRouter from "./modules/order/order-router.js";
import basketRouter from "./modules/basket/basket-router.js";
import productRouter from "./modules/product/product-router.js";
import paymentRouter from "./modules/payment/payment-router.js";
import permissionRouter from "./modules/permission/permission-router.js";
import rolePermissionRouter from "./modules/role-permission/role-permission-router.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/roles", roleRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/baskets", basketRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/payments", paymentRouter);
mainRouter.use("/permissions", permissionRouter);
mainRouter.use("/role-permissions", rolePermissionRouter);

export default mainRouter;
