import { Router } from "express";
import productValidator from "./product-validation.js";
import productController from "./product-controller.js";

const productRouter = Router();
productRouter.post(
  "/",
  productValidator.validateCreate,
  productController.create
);

export default productRouter;
