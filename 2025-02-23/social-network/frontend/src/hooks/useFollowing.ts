
import { useAppDispatch } from '../redux/hooks';
import { setFollowing } from '../redux/slices/followingSlice';
import { FollowersService } from '../services/auth-aware/FollowersService';
import useService from './useService';

export const useFollowing = () => {
  const dispatch = useAppDispatch();
  const followersService = useService(FollowersService);

  const fetchFollowing = async () => {
    try {
      const following = await followersService.getFollowing();
      dispatch(setFollowing(following));
    } catch (error) {
      console.error('Failed to fetch following:', error);
      throw error;
    }
  };

  return {
    fetchFollowing
  };
};