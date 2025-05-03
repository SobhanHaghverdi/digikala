import OrderItem from "./order-item-model.js";

async function bulkCreate(dtos) {
  return await OrderItem.bulkCreate(dtos);
}

const orderItemService = { bulkCreate };
export default orderItemService;
