import authService from "./auth-service.js";

async function sendOtp(req, res) {
  const otp = await authService.sendOtp(req.body.mobile);
  return res.json({ message: "Otp sent successfully", otp });
}

async function checkOtp(req, res) {
  const { code, mobile } = req.body;
  const result = await authService.checkOtp(code, mobile);

  return res.json({ ...result, message: "You have logged in successfully" });
}

const authController = { sendOtp, checkOtp };
export default authController;
