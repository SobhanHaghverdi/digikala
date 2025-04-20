import ProductColor from "./product-color-model.js";

async function bulkCreate(dtos) {
  await ProductColor.bulkCreate(dtos);
}

const productColorService = { bulkCreate };
export default productColorService;
