import { useAppDispatch } from '../redux/hooks';
import { setFollowers } from '../redux/slices/followersSlice';
import { removeFollowing } from '../redux/slices/followingSlice';
import { FollowersService } from '../services/auth-aware/FollowersService';
import useService from './useService';

export const useFollowers = () => {
  const dispatch = useAppDispatch();
  const followersService = useService(FollowersService);

  const fetchFollowers = async () => {
    try {
      const followers = await followersService.getFollowers();
      dispatch(setFollowers(followers));
    } catch (error) {
      console.error('Failed to fetch followers:', error);
    }
  };

  const follow = async (userId: string) => {
    try {
      await followersService.followUser(userId);
      await fetchFollowers();
    } catch (error) {
      console.error('Failed to follow user:', error);
      throw error;
    }
  };

  const unfollow = async (userId: string) => {
    try {
      await followersService.unfollowUser(userId);
      dispatch(removeFollowing(userId));
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
