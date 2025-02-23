import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "config";
import AppError from "../../errors/app-error";

export function jwtExtractor(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(new AppError(401, "Authorization header missing"));
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = verify(token, config.get("app.jwtSecret"));
    (req as any).userId = (decoded as any).id;
    next();
  } catch (err) {
    return next(new AppError(401, "Invalid token"));
  }
}
