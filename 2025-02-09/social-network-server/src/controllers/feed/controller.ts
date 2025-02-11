import { NextFunction, Request, Response } from "express";
import Post from "../../models/post";
import Follow from "../../models/follow";
import User from "../../models/User";
import Comment from "../../models/comment";

export async function getUserFeed(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = '1230ae30-dc4f-4752-bd84-092956f5c633';

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