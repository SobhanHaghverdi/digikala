import Order from "./order-model.js";

async function create(dto) {
  return await Order.create(dto);
}

const orderService = { create };
export default orderService;
