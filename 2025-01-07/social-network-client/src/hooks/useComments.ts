import { useAppDispatch } from '../redux/hooks';
import { addComment as addCommentAction } from '../redux/slices/profileSlice';
import { CommentService } from '../services/auth-aware/CommentService';
import useService from './useService';

export const useComments = () => {
  const dispatch = useAppDispatch();
  const commentService = useService(CommentService);

  const addComment = async (postId: string, body: string) => {
    try {
      const comment = await CommentService.addComment(postId, body);
      dispatch(addCommentAction({ postId, comment }));
      return comment;
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  };

  const updateComment = async (commentId: string, body: string) => {
    try {
      return await commentService.updateComment(commentId, body);
    } catch (error) {
      console.error('Failed to update comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      throw error;
    }
  };

  const getComments = async (postId: string) => {
    try {
      return await commentService.getComments(postId);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw error;
    }
  };

  return {
    addComment,
    updateComment,
    deleteComment,
    getComments
  };
};