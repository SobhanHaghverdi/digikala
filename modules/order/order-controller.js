import createHttpError from "http-errors";
import orderService from "./order-service.js";

async function get(req, res) {
  const order = await orderService.getById(req.params.id);
  if (!order) throw createHttpError(404, "Order not found");

  return res.json(order);
}

async function getMyOrders(req, res) {
  const orders = await orderService.filter({
    ...req.query,
    userId: req.user?.id,
  });

  return res.json(orders);
}

const orderController = { get, getMyOrders };
export default orderController;
