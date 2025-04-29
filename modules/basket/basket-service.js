import Basket from "./basket-model.js";
import createHttpError from "http-errors";
import Product from "../product/product-model.js";
import productService from "../product/product-service.js";
import ProductType from "../../common/constant/product-enum.js";
import ProductSize from "../product-size/product-size-model.js";
import ProductColor from "../product-color/product-color-model.js";
import productSizeService from "../product-size/product-size-service.js";
import productColorService from "../product-color/product-color-service.js";

async function getAllByUserId(userId) {
  let finalAmount = 0;
  let totalAmount = 0;
  let finalBasket = [];
  let totalDiscount = 0;

  const baskets = await Basket.findAll({
    raw: true,
    where: { userId },
    include: [
      { model: Product, as: "product" },
      { model: ProductSize, as: "size" },
      { model: ProductColor, as: "color" },
    ],
  });

  for (const item of baskets) {
    const { product, count, color = undefined, size = undefined } = item;

    let productData = finalBasket.find((item) => item.id === product.id);

    if (!productData) {
      productData = {
        sizes: [],
        colors: [],
        id: product.id,
        count: item.count,
        type: product.type,
        title: product.title,
        price: product.price,
      };
    } else {
      productData.count += count;
    }

    if (product?.type === ProductType.Coloring && color) {
      const price = color.price * count;
      totalAmount += price;

      let finalPrice = price;
      let discountAmount = 0;

      if (color?.active_discount && color?.discount > 0) {
        discountAmount = price * (color?.discount / 100);
        totalDiscount += discountAmount;
      }

      finalPrice = price - discountAmount;
      finalAmount += finalPrice;

      productData.colors.push({
        count,
        price,
        finalPrice,
        id: color?.id,
        discountAmount,
        code: color.code,
        name: color?.name,
      });
    } else if (product?.type === ProductType.Sizing && size) {
      const price = size.price * count;
      totalAmount += price;

      let finalPrice = price;
      let discountAmount = 0;

      if (size?.active_discount && size?.discount > 0) {
        discountAmount = price * (size?.discount / 100);
        totalDiscount += discountAmount;
      }

      finalPrice = price - discountAmount;
      finalAmount += finalPrice;

      productData.sizes.push({
        count,
        price,
        finalPrice,
        id: size?.id,
        discountAmount,
        size: size?.size,
      });
    } else if (product?.type === ProductType.Single && product) {
      const price = product.price * count;
      totalAmount += price;

      let finalPrice = price;
      let discountAmount = 0;

      if (product?.active_discount && product?.discount > 0) {
        discountAmount = price * (product?.discount / 100);
        totalDiscount += discountAmount;
      }

      finalPrice = price - discountAmount;
      finalAmount += finalPrice;

      productData.finalPrice = finalPrice;
      productData.discountAmount = discountAmount;
    }

    const productIndex = finalBasket.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex > -1) finalBasket[productIndex] = productData;
    else finalBasket.push(productData);

    return { totalAmount, totalDiscount, finalAmount, basket: finalBasket };
  }
}

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

const basketService = { upsert, getAllByUserId };
export default basketService;
