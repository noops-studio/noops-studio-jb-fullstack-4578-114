import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "config";
import AppError from "../../errors/app-error";

export function jwtExtractor(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(new AppError(401, "Authorization header missing"));
  }
  // If the header is in the format "Bearer token", extract the token part:
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    // Decode and verify the token using your secret key.
    const decoded = verify(token, config.get("app.jwtSecret"));
    // Assume that the payload contains an “id” property.
    (req as any).userId = (decoded as any).id;
    next();
  } catch (err) {
    return next(new AppError(401, "Invalid token"));
  }
}
