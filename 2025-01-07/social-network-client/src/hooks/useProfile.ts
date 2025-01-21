import { useAppDispatch } from '../redux/hooks';
import { setLoading, setError, setPosts, addPost, updatePost, removePost, addComment } from '../redux/slices/profileSlice';
import profileService from '../services/Profile';
import PostDraft from '../models/posts/PostDraft';

export const useProfile = () => {
  const dispatch = useAppDispatch();

  const fetchPosts = async () => {
    dispatch(setLoading(true));
    try {
      const posts = await profileService.getProfile();
      dispatch(setPosts(posts));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createPost = async (newPost: PostDraft) => {
    dispatch(setLoading(true));
    try {
      const post = await profileService.addPost(newPost);
      dispatch(addPost(post));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editPost = async (id: string, updatedPost: PostDraft) => {
    dispatch(setLoading(true));
    try {
      const post = await profileService.updatePost(id, updatedPost);
      dispatch(updatePost(post));
    } catch (error: any) {
      dispatch(setError(error.message));
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createComment = async (postId: string, body: string) => {
    try {
      const comment = await profileService.addComment(postId, body);
      dispatch(addComment({ postId, comment }));
    } catch (error: any) {
      dispatch(setError(error.message));
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