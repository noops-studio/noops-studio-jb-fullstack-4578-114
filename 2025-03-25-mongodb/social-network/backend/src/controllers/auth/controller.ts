import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import { createHmac } from "crypto";
import config from "config";
import { sign } from "jsonwebtoken";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";

// Hash function as used in your app
function hashPassword(password: string): string {
  return createHmac("sha256", config.get<string>("app.secret"))
    .update(password)
    .digest("hex");
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  // Destructure outside try so that 'username' is available in catch as well.
  const { username, password, name } = req.body;
  try {
    const hashedPassword = hashPassword(password);
    const user = new User({ username, name, password: hashedPassword });
    await user.save();
    const jwt = sign({ id: user._id, username: user.username }, config.get<string>("app.jwtSecret"));
    res.json({ jwt });
  } catch (error: any) {
    // 11000 is the duplicate key error code from MongoDB
    if (error.code === 11000) {
      return next(
        new AppError(
          StatusCodes.CONFLICT,
          `Username ${username} already exists. Please choose another username.`
        )
      );
    }
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await User.findOne({ username, password: hashedPassword });
    if (!user) {
      return next(new AppError(StatusCodes.UNAUTHORIZED, "Wrong credentials"));
    }
    const jwt = sign({ id: user._id, username: user.username }, config.get<string>("app.jwtSecret"));
    res.json({ jwt });
  } catch (error) {
    next(error);
  }
}
