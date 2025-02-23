import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Post from "../../models/post";
import Comment from "../../models/comment";

export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
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
        res.json(profile?.posts || []);
    } catch (e) {
        next(e);
    }
  }
  
export async function getPost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [ User, {
                model: Comment,
                include: [ User ]
            } ]
        });
        res.json(post);
    } catch (error) {
        next(error);
    }
}

export async function deletePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        // const post = await Post.findByPk(req.params.id);
        // await post.destroy();
        const id = req.params.id;
        const deletedRaws = await Post.destroy({
             where: { id } 
            });
            if(deletedRaws === 0) return next({
                status: 404,
                message: `Post with id ${id} not found`
            })
            res.json({
                success: true
            })
    } catch (error) {
        next(error);
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
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