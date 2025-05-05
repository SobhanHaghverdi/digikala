import Order from "./order-model.js";
import createHttpError from "http-errors";
import Product from "../product/product-model.js";
import OrderItem from "../order-item/order-item-model.js";
import OrderStatus from "../../common/constant/order-enum.js";
import ProductSize from "../product-size/product-size-model.js";
import ProductColor from "../product-color/product-color-model.js";

async function filter(query) {
  const { status } = query;

  if (!status || !Object.values(OrderStatus).includes(status)) {
    throw createHttpError(400, "Status value is not valid");
  }

  return await Order.findAll({
    raw: true,
    where: { status, userId: dto?.userId },
  });
}

async function getById(id) {
  return await Order.findByPk(id, {
    raw: true,
    include: [
      {
        model: OrderItem,
        as: "items",
        include: [
          { model: Product, as: "product" },
          { model: ProductSize, as: "size" },
          { model: ProductColor, as: "color" },
        ],
      },
    ],
  });
}

async function create(dto) {
  return await Order.create(dto);
}

async function update(id, dto) {
  return await Order.update(dto, { where: { id: id } });
}

async function remove(id) {
  return await Order.destroy({ where: { id } });
}

const orderService = { create, update, remove, filter, getById };
export default orderService;
