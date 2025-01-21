import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Post from '../../models/posts/Post';
import Comment from '../../models/comment/Comments';

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        if (!post.comments) {
          post.comments = [];
        }
        post.comments.push(comment);
      }
    }
  }
});

export const {
  setLoading,
  setError,
  setPosts,
  addPost,
  updatePost,
  removePost,
  addComment
} = profileSlice.actions;

export default profileSlice.reducer;

