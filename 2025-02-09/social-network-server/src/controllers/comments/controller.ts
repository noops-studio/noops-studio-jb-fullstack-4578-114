import Comment from "../../models/comment";
import { NextFunction, Request, Response } from "express";
import { newCommentValidator } from "./validator";

export async function createComment(req: Request, res: Response, next: NextFunction) {
    try {
        await newCommentValidator.validateAsync(req.body);
        const { postId, userId, body } = req.body;
        const comment = await Comment.create({ postId, userId, body });
        res.json(comment);
    } catch (e) {
        next(e);
    }
}