import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import userService from "../user/user-service.js";

async function authGuard(req, res, next) {
  const authorization = req?.headers?.authorization;
  if (!authorization) throw createHttpError(401, "Please login first");

  const [bearer, token] = authorization.split(" ");

  if (!bearer || bearer?.toLowerCase() !== "bearer") {
    throw createHttpError(401, "Please login first");
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (verifiedToken?.userId) {
    const user = await userService.getById(verifiedToken.userId);
    if (!user) throw createHttpError(401, "Please login first");

    req.user = { id: user.id, mobile: user.mobile, fullName: user.fullName };
    return next();
  }

  throw createHttpError(401, "Please login first");
}

export default authGuard;
