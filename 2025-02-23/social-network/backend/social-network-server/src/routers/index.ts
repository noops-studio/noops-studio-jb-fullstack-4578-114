// routers/index.ts
import { Router } from "express";
import profileRouter from "./profile";
import commentsRouter from "./comments";
import followsRouter from "./follows";
import feedRouter from "./feed";
import authRouter from "./auth";
import { jwtExtractor } from "../middlewares/auth/jwt-auth";

const router = Router();

router.use((req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next();
  }
  return jwtExtractor(req, res, next);
});

router.use("/profile", profileRouter);
router.use("/follows", followsRouter);
router.use("/comments", commentsRouter);
router.use("/feed", feedRouter);
router.use("/auth", authRouter);

export default router;
