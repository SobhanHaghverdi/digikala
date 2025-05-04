import paymentService from "./payment-service.js";
import zarinpalService from "../zarinpal/zarinpal-service.js";

async function start(req, res) {
  const payment = await paymentService.create(req.body);

  const paymentRequestResult = await zarinpalService.paymentRequest(
    payment?.amount,
    req?.user
  );

  return res.json(paymentRequestResult);
}

const paymentController = { start };
export default paymentController;
