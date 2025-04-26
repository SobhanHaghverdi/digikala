import User from "./user-model.js";
import Otp from "../otp/otp-model.js";

async function getByMobile(mobile) {
  return await User.findOne({
    where: { mobile: mobile?.trim() },
    include: [{ model: Otp, as: "otp" }],
    raw: true,
  });
}

async function create(dto) {
  return await User.create(dto, { raw: true });
}

const userService = { getByMobile, create };
export default userService;
