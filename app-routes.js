import { Router } from "express";
import authRouter from "./modules/auth/auth-router.js";
import productRouter from "./modules/product/product-router.js";

const mainRouter = Router();

mainRouter.use("/products", productRouter);
mainRouter.use("/auth", authRouter);

export default mainRouter;
