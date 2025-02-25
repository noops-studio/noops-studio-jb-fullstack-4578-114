import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/app-error";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return next(new AppError(401, "Unauthorized"));
  }
  next();
}
