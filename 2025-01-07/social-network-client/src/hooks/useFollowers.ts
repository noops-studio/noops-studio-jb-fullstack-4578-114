import { useAppDispatch } from '../redux/hooks';
import { setFollowers, removeFollower, addFollower } from '../redux/slices/followersSlice';
import { removeFollowing } from '../redux/slices/followingSlice';
import followerService from '../services/auth-aware/FollowersService';
import User from '../models/users/Users';

export const useFollowers = () => {
  const dispatch = useAppDispatch();

  const fetchFollowers = async () => {
    try {
      const followers = await followerService.getFollowers();
      dispatch(setFollowers(followers));
    } catch (error) {
      console.error('Failed to fetch followers:', error);
    }
  };

  const follow = async (userId: string) => {
    try {
      await followerService.followUser(userId);
      // Re-fetch followers to get updated list
      await fetchFollowers();
    } catch (error) {
      console.error('Failed to follow user:', error);
      throw error;
    }
  };

  const unfollow = async (userId: string) => {
    try {
      await followerService.unfollowUser(userId);
      // Update both followers and following lists
      dispatch(removeFollowing(userId));
      // Re-fetch followers to get updated list
      await fetchFollowers();
    } catch (error) {
      console.error('Failed to unfollow user:', error);
      throw error;
    }
  };

  return {
    fetchFollowers,
    follow,
    unfollow
  };
};