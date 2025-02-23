import { Router } from "express";
import { createComment } from "../controllers/comments/controller";
import validation from "../middlewares/validation";
import { newCommentValidator } from "../controllers/comments/validator";

const commentsRouter = Router();

commentsRouter.post("/", validation(newCommentValidator), createComment);

export default commentsRouter;