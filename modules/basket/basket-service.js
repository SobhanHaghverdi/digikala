import Basket from "./basket-model.js";
import createHttpError from "http-errors";
import productService from "../product/product-service.js";
import ProductType from "../../common/constant/product-enum.js";
import productSizeService from "../product-size/product-size-service.js";
import productColorService from "../product-color/product-color-service.js";

async function upsert(dto) {
  const { productId, sizeId = undefined, colorId = undefined } = dto;

  const product = await productService.getById(productId);
  if (!product) throw createHttpError(404, "Product not found");

  const fixedDto = { productId, userId: dto.userId };

  let sizeCount;
  let colorCount;
  let productCount;

  if (product.type === ProductType.Coloring) {
    if (!colorId) throw createHttpError(400, "Send color details");

    const productColor = await productColorService.getById(colorId);
    if (!productColor) throw createHttpError(404, "Product color not found");

    if (productColor.count === 0) {
      throw createHttpError(400, "Product color count not enough");
    }

    fixedDto.colorId = colorId;
    colorCount = productColor.count;
  } else if (product.type === ProductType.Sizing) {
    if (!sizeId) throw createHttpError(400, "Send size details");

    const productSize = await productSizeService.getById(sizeId);
    if (!productSize) throw createHttpError(404, "Product size not found");

    if (productSize.count === 0) {
      throw createHttpError(400, "Product size count not enough");
    }

    fixedDto.sizeId = sizeId;
    sizeCount = productSize.count;
  } else {
    if (product.count === 0) {
      throw createHttpError(400, "Product count not enough");
    }

    productCount = product.count;
  }

  const basket = await Basket.findOne({ where: fixedDto });

  if (basket) {
    if (
      (sizeCount && sizeCount > basket?.count) ||
      (colorCount && colorCount > basket?.count) ||
      (productCount && productCount > basket?.count)
    ) {
      basket.count += 1;
    } else {
      throw createHttpError(400, "Product count not enough");
    }

    await basket.save();
  } else {
    await Basket.create({ ...fixedDto, count: 1 });
  }
}

const basketService = { upsert };
export default basketService;
