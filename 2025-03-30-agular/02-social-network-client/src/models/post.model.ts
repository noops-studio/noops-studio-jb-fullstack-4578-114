import Comment from './comment.model';
import PostDraft from './post-draft.model';
import User from './user.model';

export default interface Post extends PostDraft {
  id: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  user: User;
}