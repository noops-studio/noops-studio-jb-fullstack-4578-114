import { NextFunction, Request, Response } from "express";
import Post from "../../models/post";
import Follow from "../../models/follow";

export async function getFeed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    
    // Find all follow records where the current user is the follower.
    const follows = await Follow.find({ follower: userId });
    
    // Extract followee IDs (users that current user is following).
    const followeeIds = follows.map((follow) => follow.followee);

    // Find posts made by the users the current user is following.
    const posts = await Post.find({ user: { $in: followeeIds } })
      .populate("user") // Populate the post's user field.
      .populate({ path: "comments", populate: "user" }) // Populate comments and each comment's user.
      .sort({ createdAt: -1 }); // Sort posts by most recent first.

    res.json(posts);
  } catch (error) {
    next(error);
  }
}
