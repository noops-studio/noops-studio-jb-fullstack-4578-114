// hooks/useProfile.ts
import { useAppDispatch } from '../redux/hooks';
import { setLoading, setError, setPosts, addPost, updatePost, removePost, addComment } from '../redux/slices/profileSlice';
import Profile from '../services/auth-aware/Profile';
import PostDraft from '../models/posts/PostDraft';
import useService from './useService';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileService = useService(Profile);

  const fetchPosts = async () => {
    dispatch(setLoading(true));
    try {
      const posts = await profileService.getProfile();
      dispatch(setPosts(posts));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createPost = async (newPost: PostDraft) => {
    dispatch(setLoading(true));
    try {
      const post = await profileService.addPost(newPost);
      dispatch(addPost(post));
      return post;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editPost = async (id: string, updatedPost: PostDraft) => {
    dispatch(setLoading(true));
    try {
      const post = await profileService.updatePost(id, updatedPost);
      dispatch(updatePost(post));
      return post;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deletePost = async (id: string) => {
    dispatch(setLoading(true));
    try {
      await profileService.removePost(id);
      dispatch(removePost(id));
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createComment = async (postId: string, body: string) => {
    try {
      const comment = await profileService.addComment(postId, body);
      dispatch(addComment({ postId, comment }));
      return comment;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    }
  };

  return {
    fetchPosts,
    createPost,
    editPost,
    deletePost,
    createComment
  };
};