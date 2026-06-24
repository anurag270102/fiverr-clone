import Jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "Not authenticated"));

  Jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(createError(401, "Token expired"));

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
