import { NextFunction, Request, Response } from "express";
import Post from "../../models/post";
import User from "../../models/User";
import Comment from "../../models/comment";

export async function getUserFeed(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = '1230ae30-dc4f-4752-bd84-092956f5c633';
        
        const user = await User.findByPk(userId, {
            include: [{
                model: User,
                as: 'following',
                attributes: ['id']
            }]
        });

        if (!user) {
            return next({
                status: 404,
                message: 'User not found'
            });
        }

        const followingIds = user.following.map(following => following.id);

        const feed = await Post.findAll({
            where: {
                userId: followingIds
            },
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: [User]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(feed);
    } catch (e) {
        next(e);
    }
}