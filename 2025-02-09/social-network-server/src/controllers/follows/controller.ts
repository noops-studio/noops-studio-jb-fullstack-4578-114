import { NextFunction, Request, Response } from "express";
import Follow from "../../models/follow";
import User from "../../models/User";

export async function getFollowers(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            return next({ status: 400, message: "User ID is required" });
        }
        const user = await User.findByPk(userId, { 
            include: [{ model: User, as: "followers" }] 
        });
        res.json(user?.followers || []);
    } catch (e) {
        next(e);
    }
}

export async function getFollowing(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            return next({ status: 400, message: "User ID is required" });
        }
        const user = await User.findByPk(userId, { 
            include: [{ model: User, as: "following" }] 
        });
        res.json(user?.following || []);
    } catch (e) {
        next(e);
    }
}

export async function followUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.body.userId;
        const followeeId = req.params.id;
        if (!userId || !followeeId) {
            return next({ status: 400, message: "Both userId and followeeId are required" });
        }
        const follow = await Follow.create({ 
            followerId: userId, 
            followeeId 
        });
        res.json(follow);
    } catch (e) {
        next(e);
    }
}

export async function unfollowUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.body.userId;
        const followeeId = req.params.id;
        if (!userId || !followeeId) {
            return next({ status: 400, message: "Both userId and followeeId are required" });
        }
        await Follow.destroy({ 
            where: { 
                followerId: userId, 
                followeeId 
            } 
        });
        res.json({ success: true });
    } catch (e) {
        next(e);
    }
}