import User from './user.model';
import CommentDraft from './comment-draft.model';

export default interface Comment extends CommentDraft {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}