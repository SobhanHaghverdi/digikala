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

async function cancelStatus(req, res) {
  await orderService.cancelStatus(req.params.id, req.body.reason);
  return res.json({ message: "Order canceled successfully" });
}

async function setPackedStatus(req, res) {
  await orderService.setPackedStatus(req.params.id);
  return res.json({ message: "Order status changed to packed successfully" });
}

async function setInTransitStatus(req, res) {
  await orderService.setInTransitStatus(req.params.id);

  return res.json({
    message: "Order status changed to in-transit successfully",
  });
}

async function setDeliveredStatus(req, res) {
  await orderService.setDeliveredStatus(req.params.id);

  return res.json({
    message: "Order status changed to delivered successfully",
  });
}

const orderController = {
  get,
  getMyOrders,
  cancelStatus,
  setPackedStatus,
  setDeliveredStatus,
  setInTransitStatus,
};
export default orderController;
