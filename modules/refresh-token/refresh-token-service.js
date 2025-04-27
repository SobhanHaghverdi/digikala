import RefreshToken from "./refresh-token-model.js";

async function getByToken(token) {
  return await RefreshToken.findOne({
    raw: true,
    where: { token: token?.trim() },
  });
}

async function create(dto) {
  return await RefreshToken.create(dto, { raw: true });
}

const refreshTokenService = { getByToken, create };
export default refreshTokenService;
