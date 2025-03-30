import { NextFunction, Request, Response } from "express";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import config from "config";

// Define an interface for your JWT payload
interface JwtPayload {
  id: string;
  username: string;
  // add additional properties if needed
}

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export default function enforceAuth(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "missing authorization header"));
  }

  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "bad authorization header"));
  }

  try {
    // Cast the decoded token as our JwtPayload interface
    const decoded = verify(parts[1], config.get<string>("app.jwtSecret")) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (e) {
    next(new AppError(StatusCodes.UNAUTHORIZED, "invalid JWT"));
  }
}
