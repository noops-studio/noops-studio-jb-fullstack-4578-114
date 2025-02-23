import { Router } from "express";
import { followUser, getFollowers, getFollowing, unfollowUser } from "../controllers/follows/controller";

const followsRouter = Router();

followsRouter.get("/followers", getFollowers);
followsRouter.get("/following", getFollowing);
followsRouter.post("/follow/:id", followUser);
followsRouter.post("/unfollow/:id", unfollowUser);

export default followsRouter;
