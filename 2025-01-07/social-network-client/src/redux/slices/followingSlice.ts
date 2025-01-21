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
    init: (state, action: PayloadAction<User[]>) => ({
      ...state,
      following: action.payload,
    }),
    unfollow: (state, action: PayloadAction<string>) => ({
      ...state,
      following: state.following.filter(user => user.id !== action.payload),
    }),
    follow: (state, action: PayloadAction<User>) => ({
      ...state,
      following: [...state.following, action.payload],
    }),
  },
});

export const { init, unfollow, follow } = followingSlice.actions;
export default followingSlice.reducer;
