import { NextFunction, Request, Response } from "express";
import Post from "../../models/post";
import Follow from "../../models/follow";
import User from "../../models/User";
import Comment from "../../models/comment";

export async function getUserFeed(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;

        const feedPosts = await Post.findAll({
            include: [
                {
                    model: Follow,
                    where: {
                        followerId: userId
                    },
                    required: true
                },
                {
                    model: Comment,
                    include: [{
                        model: User
                    }]
                },
                {
                    model: User
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(feedPosts);
    } catch (e) {
        console.error('Error in getUserFeed:', e);
        next(e);
    }
}