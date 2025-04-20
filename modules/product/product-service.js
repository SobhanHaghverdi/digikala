import Product from "./product-model.js";
import createHttpError from "http-errors";
import ProductType from "../../common/constant/product-enum.js";
import productSizeService from "../product-size/product-size-service.js";
import productColorService from "../product-color/product-color-service.js";
import productDetailService from "../product-detail/product-detail-service.js";

async function create(dto) {
  const {
    type,
    sizes = undefined,
    colors = undefined,
    details = undefined,
  } = dto;

  if (!Object.values(ProductType).includes(type)) {
    throw createHttpError.BadRequest("Invalid product type");
  }

  const product = await Product.create(dto, {
    raw: true,
    fields: [
      "type",
      "count",
      "price",
      "title",
      "discount",
      "description",
      "active_discount",
    ],
  });

  if (details && details.length > 0) {
    const productDetails = [];

    for (const detail of details) {
      productDetails.push({
        key: detail.key,
        value: detail.value,
        productId: product.id,
      });
    }

    await productDetailService.bulkCreate(productDetails);
  }

  if (type === ProductType.Coloring && colors && colors.length > 0) {
    const productColors = [];

    for (const color of colors) {
      productColors.push({
        name: color.name,
        code: color.code,
        count: color.count,
        price: color.price,
        productId: product.id,
        discount: color.discount,
        active_discount: color.active_discount,
      });
    }

    await productColorService.bulkCreate(productColors);
  }

  if (type === ProductType.Sizing && sizes && sizes.length > 0) {
    const productSizes = [];

    for (const size of sizes) {
      productSizes.push({
        size: size.size,
        count: size.count,
        price: size.price,
        productId: product.id,
        discount: size.discount,
        active_discount: size.active_discount,
      });
    }

    await productSizeService.bulkCreate(productSizes);
  }
}

const productService = { create };
export default productService;
