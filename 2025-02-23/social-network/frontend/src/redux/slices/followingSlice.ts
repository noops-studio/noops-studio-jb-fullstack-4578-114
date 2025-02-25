
// redux/slices/followingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/users/Users';

interface FollowingState {
  following: User[];
}

const initialState: FollowingState = {
  following: [],
};

const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
    setFollowing: (state, action: PayloadAction<User[]>) => {
      state.following = action.payload;
    },
    removeFollowing: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(user => user.id !== action.payload);
    },
    addFollowing: (state, action: PayloadAction<User>) => {
      state.following.push(action.payload);
    }
  }
});

export const { setFollowing, removeFollowing, addFollowing } = followingSlice.actions;
export default followingSlice.reducer;
