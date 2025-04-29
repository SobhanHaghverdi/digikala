import Product from "./product-model.js";
import createHttpError from "http-errors";
import ProductSize from "../product-size/product-size-model.js";
import ProductType from "../../common/constant/product-enum.js";
import ProductColor from "../product-color/product-color-model.js";
import ProductDetail from "../product-detail/product-detail-model.js";
import productSizeService from "../product-size/product-size-service.js";
import productColorService from "../product-color/product-color-service.js";
import productDetailService from "../product-detail/product-detail-service.js";

async function getById(id) {
  return await Product.findByPk(id, { raw: true });
}

async function getByIdWithRelations(id) {
  return await Product.findByPk(id, {
    include: [
      { model: ProductSize, as: "sizes" },
      { model: ProductColor, as: "colors" },
      { model: ProductDetail, as: "details" },
    ],
  });
}

async function getAll() {
  return await Product.findAll();
}

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

async function removeById(id) {
  const product = await Product.findByPk(id);
  if (!product) throw createHttpError.NotFound("Product not found");

  await product.destroy();
}

const productService = {
  create,
  getAll,
  getById,
  removeById,
  getByIdWithRelations,
};
export default productService;
