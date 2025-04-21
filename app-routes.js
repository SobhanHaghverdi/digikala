import { Router } from "express";
import productRouter from "./modules/product/product-router.js";

const mainRouter = Router();
mainRouter.use("/products", productRouter);

export default mainRouter;
