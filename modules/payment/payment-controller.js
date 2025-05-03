import paymentService from "./payment-service.js";

async function start(req, res) {
  await paymentService.create(req.body);
  return res.json({ paymentGatewayUrl: "https://zarinpal.com/payment" });
}

const paymentController = { start };
export default paymentController;
