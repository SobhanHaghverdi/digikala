import createHttpError from "http-errors";

async function paymentRequest(amount, user, description = "خرید محصول") {
  const {
    ZARINPAL_REQUEST_URL,
    ZARINPAL_MERCHANT_ID,
    ZARINPAL_GATEWAY_URL,
    ZARINPAL_CALLBACK_URL,
  } = process.env;

  try {
    const result = await axios.post(
      ZARINPAL_REQUEST_URL,
      {
        amount,
        description,
        merchant_id: ZARINPAL_MERCHANT_ID,
        callback_url: ZARINPAL_CALLBACK_URL,
        metadata: { email: "", mobile: user?.mobile },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!result?.data?.authority) {
      throw createHttpError(400, "Zarinpal service not available");
    }

    return `${ZARINPAL_GATEWAY_URL}/${result.data.authority}`;
  } catch (error) {
    console.log(error);
  }
}

const zarinpalService = { paymentRequest };
export default zarinpalService;
