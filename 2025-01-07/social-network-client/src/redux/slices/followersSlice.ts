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
    init: (state, action: PayloadAction<User[]>) => ({
      ...state,
      followers: action.payload,
    }),
    unfollow: (state, action: PayloadAction<string>) => ({
      ...state,
      followers: state.followers.filter(user => user.id !== action.payload),
    }),
    follow: (state, action: PayloadAction<User>) => ({
      ...state,
      followers: [...state.followers, action.payload],
    }),
  },
});

export const { init, unfollow, follow } = followersSlice.actions;
export default followersSlice.reducer;
