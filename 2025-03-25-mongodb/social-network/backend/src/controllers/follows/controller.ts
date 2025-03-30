import { NextFunction, Request, Response } from "express";
import Follow from "../../models/follow";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";

// Get the list of users following the authenticated user
export async function getFollowers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    // Find follows where the current user is the followee.
    const followers = await Follow.find({ followee: userId }).populate(
      "follower",
      "name username"
    );
    // Return only the follower user data.
    res.json(followers.map((f) => f.follower));
  } catch (error) {
    next(error);
  }
}

// Get the list of users the authenticated user is following
export async function getFollowing(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    // Find follows where the current user is the follower.
    const following = await Follow.find({ follower: userId }).populate(
      "followee",
      "name username"
    );
    // Return only the followee user data.
    res.json(following.map((f) => f.followee));
  } catch (error) {
    next(error);
  }
}

// Follow a user by creating a follow document.
export async function follow(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const follow = new Follow({
      follower: userId,
      followee: req.params.id,
    });
    await follow.save();
    res.json(follow);
  } catch (error) {
    next(error);
  }
}

// Unfollow a user by deleting the corresponding follow document.
export async function unfollow(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const result = await Follow.findOneAndDelete({
      follower: userId,
      followee: req.params.id,
    });
    if (!result) {
      return next(
        new AppError(
          StatusCodes.NOT_FOUND,
          "Tried to delete non-existing follow record"
        )
      );
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}
