import otpService from "../otp/otp-service.js";
import userService from "../user/user-service.js";

async function sendOtp(mobile) {
  let otp;
  let user = await userService.getByMobile(mobile);

  if (!user) {
    user = await userService.create({ mobile });
    otp = await otpService.create({ userId: user.id });
  } else {
    otp = otpService.getByUserId(user.id);
  }

  return otp;
}

const authService = { sendOtp };
export default authService;
