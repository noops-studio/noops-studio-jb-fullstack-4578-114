// # components/layout/folowers/Folowers.tsx
import { useEffect } from "react";
import "./Folowers.css";
import FollowersUi from "./FolowersUi";
import followerService from "../../../services/auth-aware/FollowersService";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { init as initFollowers } from "../../../redux/followersSlice";
import { init as initFollowing } from "../../../redux/followingSlice";
import { fetchProfilePosts } from "../../../redux/profileSlice";
import feed from "../../../services/Feed";

export default function Folowers(): JSX.Element {
  const followers = useAppSelector((state) => state.followers.followers || []);
  const dispatch = useAppDispatch();

  // Function to fetch all necessary data
  const fetchData = async () => {
    try {
      // Fetch followers, following lists, and feed data in parallel
      const [followersData, followingData] = await Promise.all([
        followerService.getFollowers(),
        followerService.getFollowing(),
      ]);
      
      // Update both states
      dispatch(initFollowers(followersData));
      dispatch(initFollowing(followingData));

      // Re-fetch feed data
      await feed.getFeed();
      
      // Also refresh profile posts if needed
      dispatch(fetchProfilePosts());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleFollowUnfollow = async (userId: string, isCurrentlyFollowing: boolean) => {
    try {
      if (isCurrentlyFollowing) {
        await followerService.unfollowUser(userId);
      } else {
        await followerService.followUser(userId);
      }
      
      // Refresh all data after follow/unfollow action
      await fetchData();
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-lg font-semibold mb-4">Followers List</h1>
      <FollowersUi 
        followers={followers} 
        onFollowUnfollow={handleFollowUnfollow} 
      />
    </div>
  );
}