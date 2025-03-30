import { NextFunction, Request, Response } from "express";
import Comment from "../../models/comment";
import socket from "../../io/io";
import SocketMessages from "socket-enums-snoops";

export async function createComment(
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const { postId } = req.params;

    // Create a new comment document.
    const comment = new Comment({
      user: userId,
      post: postId,
      ...req.body,
    });

    await comment.save();

    // Populate the user field (if you want to send user info with the comment)
    await comment.populate("user");

    res.json(comment);

    // Emit a socket event (if needed)
    socket.emit(SocketMessages.NEW_COMMENT, {
      from: req.headers["x-client-id"],
      data: comment,
    });
  } catch (error) {
    next(error);
  }
}
