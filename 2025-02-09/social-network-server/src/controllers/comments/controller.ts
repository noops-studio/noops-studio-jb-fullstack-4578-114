import Comment from "../../models/comment";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { v4 } from "uuid";

export async function createComment(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.body.userId; // In author's code this would come from req.userId
        const postId = req.body.postId;
        const comment = await Comment.create({
            ...req.body,
            id: v4(),
            postId,
            userId,
        });
        await comment.reload({
            include: [User]
        });
        res.json(comment);
    } catch (e) {
        next(e);
    }
}
