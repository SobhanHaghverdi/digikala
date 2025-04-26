import authService from "./auth-service.js";

async function sendOtp(req, res) {
  const otp = await authService.sendOtp(req.body.mobile);
  return res.json({ message: "Otp sent successfully", otp });
}

const authController = { sendOtp };
export default authController;
