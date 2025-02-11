import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import Post from "../../models/post";
import Comment from "../../models/comment";
import exp from "constants";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
try {
    const userId = '1230ae30-dc4f-4752-bd84-092956f5c633'
    const profile = await User.findByPk(userId,{
        include: [{
            model: Post,
            include: [
                User,
                {
                
                model: Comment,
                include: [User]
            }]
        }]
    })
    // console.log(profile.get({plain:true}))
    res.json(profile.posts)
} catch (e) {
    next(e)
}
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User]
                }
            ]
        });
        
        if (!post) {
            return next({
                status: 404,
                message: `Post with id ${postId} not found`
            });
        }
        
        res.json(post);
    } catch (e) {
        next(e);
    }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        
        if (!post) {
            return next({
                status: 404,
                message: `Post with id ${postId} not found`
            });
        }
        
        await post.destroy();
        
        res.json({
            message: `Post with id ${postId} deleted`
        });
    } catch (e) {
        next(e);
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
    console.log(req)
    try {
        const userId = '1230ae30-dc4f-4752-bd84-092956f5c633';
        const { title, body } = req.body;
        
        const post = await Post.create({
            title,
            body,
            userId
        });
        
        res.json(post);
    } catch (e) {
        next(e);
    }
}

export async function editPost(req: Request, res: Response, next: NextFunction) {
    try {
        const postId = req.params.id;
        const { title, body } = req.body;
        
        const post = await Post.findByPk(postId);
        
        if (!post) {
            return next({
                status: 404,
                message: `Post with id ${postId} not found`
            });
        }
        
        post.title = title;
        post.body = body;
        
        await post.save();
        
        res.json(post);
    } catch (e) {
        next(e);
    }
}