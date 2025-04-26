import Otp from "./otp-model.js";

async function getByUserId(userId) {
  return await Otp.findOne({ where: { userId }, raw: true });
}

async function create(dto) {
  dto.code = Math.floor(Math.random() * 99999 - 10000) + 10000;
  dto.expires_in = new Date(Date.now() + 1000 * 60);

  return await Otp.create(dto, { raw: true });
}

const otpService = { getByUserId, create };
export default otpService;
