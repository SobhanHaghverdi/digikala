import ProductSize from "./product-size-model.js";

async function bulkCreate(dtos) {
  await ProductSize.bulkCreate(dtos);
}

const productSizeService = { bulkCreate };
export default productSizeService;
