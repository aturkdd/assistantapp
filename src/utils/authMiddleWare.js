import jwt from "jsonwebtoken";
import createError from "http-errors";
import { ROLES } from "./helper.js";

export const authenticateJWT = (req, res, next) => {
  try {
    const accessTokenBuffer = Buffer.from(process.env.PUBLIC_KEY, "utf8");
    const [authenticationScheme, token] = req.headers.authorization?.split(" ");

    if (authenticationScheme !== "Bearer") {
      throw new Error("Invalid authentication scheme.");
    }

    const payload = jwt.verify(token, accessTokenBuffer);
    req.user = {
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      id: payload.Id,
      phoneNumber: payload.phoneNumber,
      role: payload.role,
      
    };

    next();
  } catch (err) {
    const error = createError(401, "Access token invalid or not provided.");
    error.cause = err;
    next(error);
  }
};

/**
 * Authintication user permission.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const hasPermission = (req, res, next, roles) => {
  console.log(roles);

  let hasPermission = false;
  if (roles.indexOf(ROLES.USER) >= 0) {
    hasPermission = true;
  }
  if (roles.indexOf(ROLES.OWNER) >= 0) {
    if (req.user?.id === req.params.id) {
      console.log("2");
      hasPermission = true;
    }
  }
  if (roles.indexOf(ROLES.ADMIN) >= 0) {
    if (req.user?.role === ROLES.ADMIN) {
      hasPermission = true;
    }
  }

  if (hasPermission) {
    next();
  } else {
    const error = createError(401, "Access token invalid or not provided.");

    next(error);
  }
};
