import { useAppDispatch } from '../redux/hooks';
import { setFollowing } from '../redux/slices/followingSlice';
import followerService from '../services/auth-aware/FollowersService';

export const useFollowing = () => {
  const dispatch = useAppDispatch();

  const fetchFollowing = async () => {
    try {
      const following = await followerService.getFollowing();
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

