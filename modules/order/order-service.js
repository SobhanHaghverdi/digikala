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
  return await Order.update(dto, { where: { id } });
}

async function setPackedStatus(id) {
  const order = await Order.findByPk(id);
  if (!order) throw createHttpError(404, "Order not found");

  if (order.status !== OrderStatus.InProcess) {
    throw createHttpError(400, "Current status must be in-process");
  }

  order.status = OrderStatus.Packed;
  await order.save();
}

async function setInTransitStatus(id) {
  const order = await Order.findByPk(id);
  if (!order) throw createHttpError(404, "Order not found");

  if (order.status !== OrderStatus.Packed) {
    throw createHttpError(400, "Current status must be packed");
  }

  order.status = OrderStatus.InTransit;
  await order.save();
}

async function cancelStatus(id, reason) {
  const order = await Order.findByPk(id);
  if (!order) throw createHttpError(404, "Order not found");

  if (
    [OrderStatus.Pending, OrderStatus.Delivered, OrderStatus.Canceled].includes(
      order.status
    )
  ) {
    throw createHttpError(400, "Select correct order status");
  }

  order.reason = reason;
  order.status = OrderStatus.Canceled;

  await order.save();
}

async function setDeliveredStatus(id) {
  const order = await Order.findByPk(id);
  if (!order) throw createHttpError(404, "Order not found");

  if (order.status !== OrderStatus.InTransit) {
    throw createHttpError(400, "Current status must be in-transit");
  }

  order.status = OrderStatus.Delivered;
  await order.save();
}

async function remove(id) {
  return await Order.destroy({ where: { id } });
}

const orderService = {
  create,
  update,
  remove,
  filter,
  getById,
  cancelStatus,
  setPackedStatus,
  setDeliveredStatus,
  setInTransitStatus,
};
export default orderService;
