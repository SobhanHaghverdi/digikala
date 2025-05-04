import Payment from "./payment-model.js";
import orderService from "../order/order-service.js";
import basketService from "../basket/basket-service.js";
import orderItemService from "../order-item/order-item-service.js";

async function create(dto) {
  const { userId } = dto;

  const { totalAmount, basket, totalDiscount, finalAmount } =
    await basketService.getAllByUserId(userId);

  const payment = await Payment.create({ userId, amount: finalAmount });

  const order = await orderService.create({
    userId,
    address: dto.address,
    paymentId: payment.id,
    total_amount: totalAmount,
    final_amount: finalAmount,
    discount_amount: totalDiscount,
  });

  payment.orderId = order.id;
  await payment.save();

  const orderItems = [];

  for (const item of basket) {
    let items = [];

    if (item?.sizes?.length > 0) {
      items = item?.sizes?.map((size) => {
        return {
          sizeId: size?.id,
          orderId: order.id,
          count: size?.count,
          productId: item?.id,
        };
      });
    } else if (item?.colors?.length > 0) {
      items = item?.colors?.map((color) => {
        return {
          orderId: order.id,
          colorId: color?.id,
          count: color?.count,
          productId: item?.id,
        };
      });
    } else {
      items = [
        {
          orderId: order.id,
          count: item?.count,
          productId: item?.id,
        },
      ];
    }

    orderItems.push(...items);
  }

  await orderItemService.bulkCreate(orderItems);
}

const paymentService = { create };
export default paymentService;
