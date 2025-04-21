import createHttpError from "http-errors";
import productService from "./product-service.js";

async function get(req, res) {
  const product = await productService.getById(req.params.id);
  if (!product) throw createHttpError.NotFound("Product not found !");

  return res.json(product);
}

async function getAll(req, res) {
  const products = await productService.getAll();
  return res.json(products);
}

async function create(req, res) {
  await productService.create(req.body);
  return res.json({ message: "Product created successfully !" });
}

const productController = { create, get, getAll };
export default productController;
