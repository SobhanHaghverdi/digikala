import { Router } from "express";
import productValidator from "./product-validation.js";
import productController from "./product-controller.js";

const productRouter = Router();

productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.get);

productRouter.post(
  "/",
  productValidator.validateCreate,
  productController.create
);

productRouter.delete("/:id", productController.remove);

export default productRouter;
