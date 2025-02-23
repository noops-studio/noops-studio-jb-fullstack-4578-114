import { Router } from "express";
import { getUserFeed } from "../controllers/feed/controller";

const feedRouter = Router();

feedRouter.get("/", getUserFeed);

export default feedRouter;