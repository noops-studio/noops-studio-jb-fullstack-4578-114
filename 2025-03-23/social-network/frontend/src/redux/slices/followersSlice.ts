// redux/slices/followersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/users/Users';

interface FollowersState {
  followers: User[];
}

const initialState: FollowersState = {
  followers: [],
};

const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
    setFollowers: (state, action: PayloadAction<User[]>) => {
      state.followers = action.payload;
    },
    removeFollower: (state, action: PayloadAction<string>) => {
      state.followers = state.followers.filter(user => user.id !== action.payload);
    },
    addFollower: (state, action: PayloadAction<User>) => {
      state.followers.push(action.payload);
    }
  }
});

export const { setFollowers, removeFollower, addFollower } = followersSlice.actions;
export default followersSlice.reducer;
