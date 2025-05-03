import { Router } from "express";
import authRouter from "./modules/auth/auth-router.js";
import basketRouter from "./modules/basket/basket-router.js";
import productRouter from "./modules/product/product-router.js";
import paymentRouter from "./modules/payment/payment-router.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/baskets", basketRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/payments", paymentRouter);

export default mainRouter;
