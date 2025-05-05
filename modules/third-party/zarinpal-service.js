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
        description,
        amount: amount * 10,
        merchant_id: ZARINPAL_MERCHANT_ID,
        callback_url: ZARINPAL_CALLBACK_URL,
        metadata: { email: "example@gmail.com", mobile: user?.mobile },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!result?.data?.authority) {
      throw createHttpError(400, "Zarinpal service not available");
    }

    return {
      authority: result.data.authority,
      paymentGatewayUrl: `${ZARINPAL_GATEWAY_URL}/${result.data.authority}`,
    };
  } catch (error) {
    console.log(error);
  }
}

async function verify(amount, authority) {
  const { ZARINPAL_VERIFY_URL, ZARINPAL_MERCHANT_ID } = process.env;

  try {
    const result = await axios.post(
      ZARINPAL_VERIFY_URL,
      {
        authority,
        amount: amount * 10,
        merchant_id: ZARINPAL_MERCHANT_ID,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result?.data?.code === 101) {
      throw createHttpError(409, "Payment is already verified!");
    } else if (result?.data?.code !== 100) {
      throw createHttpError(400, "Payment verification failed");
    }

    return result?.data;
  } catch (error) {
    console.log(error);
  }
}

const zarinpalService = { verify, paymentRequest };
export default zarinpalService;
