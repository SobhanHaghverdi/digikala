import ProductColor from "./product-color-model.js";

async function getById(id) {
  return await ProductColor.findByPk(id, { raw: true });
}

async function bulkCreate(dtos) {
  await ProductColor.bulkCreate(dtos);
}

const productColorService = { bulkCreate, getById };
export default productColorService;
