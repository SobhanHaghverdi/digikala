import Otp from "./otp-model.js";

async function getByUserId(userId) {
  return await Otp.findOne({ where: { userId } });
}

async function create(dto) {
  return await Otp.create(dto, { raw: true });
}

const otpService = { getByUserId, create };
export default otpService;
