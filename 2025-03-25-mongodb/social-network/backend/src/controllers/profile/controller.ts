import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import Post from "../../models/post";
import socket from "../../io/io";
import SocketMessages from "socket-enums-snoops";

// Get all posts by the authenticated user
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const posts = await Post.find({ user: userId })
      .populate("user")
      .populate({ path: "comments", populate: "user" })
      .sort({ createdAt: 1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

// Get a single post by its ID (with populated user and comments)
export async function getPost(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user")
      .populate({ path: "comments", populate: "user" });
    if (!post) {
      return next(new AppError(StatusCodes.NOT_FOUND, "Post not found"));
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
}

// Delete a post by its ID
export async function deletePost(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return next(
        new AppError(StatusCodes.NOT_FOUND, "The post does not exist")
      );
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

// Create a new post
export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    let createParams: any = { ...req.body, user: userId };

    if (req.imageUrl) {
      createParams.imageUrl = req.imageUrl;
    }

    const post = new Post(createParams);
    await post.save();

    // Populate user and comments (if any) for the response.
    await post.populate("user");
    await post.populate({ path: "comments", populate: "user" });

    res.json(post);

    socket.emit(SocketMessages.NEW_POST, {
      from: req.headers["x-client-id"],
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

// Update an existing post
export async function updatePost(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, body } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new AppError(StatusCodes.NOT_FOUND, "Post not found"));
    }
    post.title = title;
    post.body = body;
    await post.save();

    // Re-populate for updated response.
    await post.populate("user");
    await post.populate({ path: "comments", populate: "user" });

    res.json(post);
  } catch (error) {
    next(error);
  }
}
