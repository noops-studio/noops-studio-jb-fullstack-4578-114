import Comment from "../../models/comment";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { v4 } from "uuid";

export async function createComment(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
        const { postId, body } = req.body;
        const comment = await Comment.create({
            id: v4(),
            postId,
            userId,
            body,
        });
        await comment.reload({ include: [User] });
        res.json(comment);
    } catch (e) {
        next(e);
    }
  }
  