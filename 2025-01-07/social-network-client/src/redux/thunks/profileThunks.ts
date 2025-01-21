import { AppDispatch } from '../store';
import profileService from '../../services/Profile';
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addPost,
  updatePost,
  deletePost,
} from '../slices/profileSlice';
import PostDraft from '../../models/posts/PostDraft';

export const fetchProfilePosts = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const posts = await profileService.getProfile();
    dispatch(fetchSuccess(posts));
  } catch (error) {
    dispatch(fetchFailure(error.message || 'Failed to fetch posts.'));
  }
};

export const addProfilePost = (newPost: PostDraft) => async (dispatch: AppDispatch) => {
  try {
    const post = await profileService.addPost(newPost);
    dispatch(addPost(post));
  } catch (error) {
    console.error(error);
  }
};
