// redux/profileSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import profileService from "../services/Profile";
import Post from "../models/posts/Post";
import PostDraft from "../models/posts/PostDraft";

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

// Fetch posts
export const fetchProfilePosts = createAsyncThunk(
  "profile/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      return await profileService.getProfile();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch posts.");
    }
  }
);

// Add post
export const addProfilePost = createAsyncThunk(
  "profile/addPost",
  async (newPost: PostDraft, { rejectWithValue }) => {
    try {
      return await profileService.addPost(newPost);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add post.");
    }
  }
);

// Update post
export const updateProfilePost = createAsyncThunk(
  "profile/updatePost",
  async ({ id, updatedPost }: { id: string; updatedPost: PostDraft }, { rejectWithValue }) => {
    try {
      const response = await profileService.updatePost(id, updatedPost);
      return { id, updatedPost: response };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update post.");
    }
  }
);

// Delete post
export const deleteProfilePost = createAsyncThunk(
  "profile/deletePost",
  async (id: string, { rejectWithValue }) => {
    try {
      await profileService.removePost(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete post.");
    }
  }
);

// Add comment
export const addCommentToPost = createAsyncThunk(
  "profile/addComment",
  async ({ postId, body }: { postId: string; body: string }, { rejectWithValue }) => {
    try {
      const newComment = await profileService.addComment(postId, body);
      return { postId, comment: newComment };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add comment.");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchProfilePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfilePosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfilePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add post
      .addCase(addProfilePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProfilePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addProfilePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update post
      .addCase(updateProfilePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfilePost.fulfilled, (state, action) => {
        const { id, updatedPost } = action.payload;
        const index = state.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...updatedPost };
        }
        state.loading = false;
      })
      .addCase(updateProfilePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete post
      .addCase(deleteProfilePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProfilePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProfilePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add comment
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          if (!post.comments) {
            post.comments = [];
          }
          post.comments.push(comment);
        }
      })
      .addCase(addCommentToPost.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;