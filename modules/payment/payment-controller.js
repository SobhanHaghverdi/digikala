import createHttpError from "http-errors";
import paymentService from "./payment-service.js";
import orderService from "../order/order-service.js";
import basketService from "../basket/basket-service.js";
import OrderStatus from "../../common/constant/order-enum.js";
import zarinpalService from "../third-party/zarinpal-service.js";

async function start(req, res) {
  const payment = await paymentService.create(req.body);

  const paymentRequestResult = await zarinpalService.paymentRequest(
    payment?.amount,
    req?.user
  );

  await paymentService.update(payment.id, {
    authority: paymentRequestResult?.authority,
  });

  return res.json(paymentRequestResult);
}

async function verify(req, res) {
  const { Status, Authority } = req.query;

  if (Status === "OK" && Authority) {
    const payment = await paymentService.getByAuthority(Authority);
    if (!payment) throw createHttpError(404, "Payment not found");

    const result = await zarinpalService.verify(
      payment?.amount,
      payment?.authority
    );

    if (result) {
      await paymentService.update(payment.id, {
        status: true,
        refId: result?.ref_id,
      });

      await orderService.update(payment.orderId, {
        status: OrderStatus.InProcess,
      });

      await basketService.removeByUserId(payment.userId);

      return res.redirect("https://frontenddomain/payment?status=success");
    } else {
      await orderService.remove(payment.orderId);
      await paymentService.remove(payment.id);
    }
  }

  return res.redirect("https://frontenddomain/payment?status=failure");
}

const paymentController = { start, verify };
export default paymentController;
