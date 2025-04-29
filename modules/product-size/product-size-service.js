import ProductSize from "./product-size-model.js";

async function getById(id) {
  return await ProductSize.findByPk(id, { raw: true });
}

async function bulkCreate(dtos) {
  await ProductSize.bulkCreate(dtos);
}

const productSizeService = { bulkCreate, getById };
export default productSizeService;
