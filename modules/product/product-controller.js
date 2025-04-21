import productService from "./product-service.js";

async function create(req, res) {
  await productService.create(req.body);
  return res.json({ message: "Product created successfully !" });
}

const productController = { create };
export default productController;
