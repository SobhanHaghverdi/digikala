import productService from "./product-service.js";

async function create(req, res) {
  await productService.create(req.body);
}

const productController = { create };

export default productController;
