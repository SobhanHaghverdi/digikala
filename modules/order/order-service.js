import Order from "./order-model.js";

async function create(dto) {
  return await Order.create(dto);
}

async function update(id, dto) {
  return await Order.update(dto, { where: { id: id } });
}

async function remove(id) {
  return await Order.destroy({ where: { id } });
}

const orderService = { create, update, remove };
export default orderService;
