import ProductDetail from "./product-detail-model.js";

async function bulkCreate(dtos) {
  await ProductDetail.bulkCreate(dtos);
}

const productDetailService = { bulkCreate };
export default productDetailService;
