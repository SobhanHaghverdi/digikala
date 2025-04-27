import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import otpService from "../otp/otp-service.js";
import userService from "../user/user-service.js";

async function sendOtp(mobile) {
  let otp;
  let user = await userService.getByMobile(mobile);

  const code = Math.floor(Math.random() * 99999 - 10000) + 10000;
  const expiresIn = new Date(Date.now() + 1000 * 60);

  if (!user) {
    user = await userService.create({ mobile });

    otp = await otpService.create({
      code,
      userId: user.id,
      expires_in: expiresIn,
    });
  } else {
    otp = await otpService.getByUserId(user.id);
    otp.code = code;
    otp.expires_in = expiresIn;

    await otp.save();
  }

  return otp;
}

async function checkOtp(code, mobile) {
  let user = await userService.getByMobile(mobile);

  if (!user) throw createHttpError(404, "User not found");

  if (user?.otp?.code !== code?.trim()) {
    throw createHttpError(401, "Otp code is invalid");
  }

  if (user?.otp?.expires_in < new Date()) {
    throw createHttpError(401, "Otp code has expired");
  }

  return generateTokens({ userId: user.id });
}

function generateTokens(payload) {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
}

async function verifyRefreshToken(refreshToken) {
  if (!refreshToken) throw createHttpError(401, "Please login first");
  const verifiedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

  if (verifiedToken?.userId) {
    const user = await userService.getById(verifiedToken.userId);
    if (!user) throw createHttpError(401, "Please login first");
  }

  return generateTokens({ userId: user.id });
}

const authService = { sendOtp, checkOtp, verifyRefreshToken };
export default authService;
