import jwt from "jsonwebtoken";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }
  
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    
    // Check if user exists and if the token matches the one in DB
    if (!user || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }
    
    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, "Not authorized"));
  }
};
