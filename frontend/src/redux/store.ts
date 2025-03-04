import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import followersReducer from './slices/followersSlice';
import followingReducer from './slices/followingSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    followers: followersReducer,
    following: followingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;