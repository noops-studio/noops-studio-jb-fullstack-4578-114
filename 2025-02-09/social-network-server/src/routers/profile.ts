import { Router } from 'express';
import { createPost, editPost, getPost, getProfile, deletePost } from '../controllers/profile/controller';
import validation from '../middlewares/validation';
import { newPostValidator } from '../controllers/profile/validators';

const profileRouter = Router();

profileRouter.get('/', getProfile);
profileRouter.get('/:id', getPost);
profileRouter.delete('/:id', deletePost);
profileRouter.post('/', validation(newPostValidator), createPost);
profileRouter.patch('/editPost/:id', validation(newPostValidator), editPost);

export default profileRouter;