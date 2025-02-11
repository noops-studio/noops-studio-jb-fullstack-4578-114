import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../../models/User";
import Post from "../../models/post";
import Comment from "../../models/comment";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = '1230ae30-dc4f-4752-bd84-092956f5c633'; // Hardcoded user ID as in your code
        const profile = await User.findByPk(userId, {
            include: [{
                model: Post,
                include: [
                    User,
                    {
                        model: Comment,
                        include: [User]
                    }
                ]
            }]
        });
        res.json(profile.posts);
    } catch (e) {
        next(e);
    }
}

export const getProfile: RequestHandler = async (req, res, next) => {
    try {
        const userId = '1230ae30-dc4f-4752-bd84-092956f5c633';
        const profile = await User.findByPk(userId, {
            include: [{
                model: Post,
                include: [
                    User,
                    {
                        model: Comment,
                        include: [User]
                    }
                ]
            }]
        });
        res.json(profile.posts);
    } catch (e) {
        next(e);
    }
};

export const getPost: RequestHandler = async (req, res, next) => {
    try {
        const postId = req.params.id;
        console.log('Looking for post with ID:', postId); // Debug log
        
        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'username']
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'username']
                    }]
                }
            ]
        });
        
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: `Post with id ${postId} not found`
            });
        }
        
        res.json(post);
    } catch (e) {
        console.error('Error fetching post:', e);
        next(e);
    }
};

export const deletePost: RequestHandler = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: `Post with id ${postId} not found`
            });
        }
        
        await post.destroy();
        res.status(200).json({ 
            status: 200,
            message: 'Post deleted successfully' 
        });
    } catch (e) {
        console.error('Error deleting post:', e);
        next(e);
    }
};

export async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = '1230ae30-dc4f-4752-bd84-092956f5c633';
        const { title, body } = req.body;
        
        const post = await Post.create({
            title,
            body,
            userId,
            imageUrl: 'http://mypic.com'
        });

        await post.reload({
            include: [
                User,
                {
                    model: Comment,
                    include: [User]
                }
            ]
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