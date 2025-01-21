import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Post from '../../models/posts/Post';
import PostDraft from '../../models/posts/PostDraft';

interface ProfileState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  posts: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchStart: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    fetchSuccess: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
      loading: false,
    }),
    fetchFailure: (state, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    addPost: (state, action: PayloadAction<Post>) => ({
      ...state,
      posts: [...state.posts, action.payload],
    }),
    updatePost: (state, action: PayloadAction<{ id: string; updatedPost: Post }>) => ({
      ...state,
      posts: state.posts.map(post =>
        post.id === action.payload.id ? { ...post, ...action.payload.updatedPost } : post
      ),
    }),
    deletePost: (state, action: PayloadAction<string>) => ({
      ...state,
      posts: state.posts.filter(post => post.id !== action.payload),
    }),
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addPost,
  updatePost,
  deletePost,
} = profileSlice.actions;
export default profileSlice.reducer;
