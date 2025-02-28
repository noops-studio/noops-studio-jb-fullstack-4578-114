import { useEffect } from "react";
import "./Folowers.css";
import FollowersUi from "./FolowersUi";
import { useAppSelector } from "../../../redux/hooks";
import { useFollowers } from "../../../hooks/useFollowers";
import { useFollowing } from "../../../hooks/useFollowing";

export default function Followers(): JSX.Element {
  const followers = useAppSelector((state) => state.followers.followers);
  const following = useAppSelector((state) => state.following.following);
  const { fetchFollowers, follow, unfollow } = useFollowers();
  const { fetchFollowing } = useFollowing();

  // Add isFollowing property to followers
  const mappedFollowers = followers.map(follower => ({
    ...follower,
    isFollowing: following.some(f => f.id === follower.id)
  }));

  // Function to fetch all necessary data
  const fetchData = async () => {
    try {
      await Promise.all([
        fetchFollowers(),
        fetchFollowing()
      ]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  const handleFollowUnfollow = async (userId: string, isCurrentlyFollowing: boolean) => {
    try {
      if (isCurrentlyFollowing) {
        await unfollow(userId);
      } else {
        await follow(userId);
      }
      // Refresh the data after follow/unfollow
      await fetchData();
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-lg font-semibold mb-4">Followers List</h1>
      <FollowersUi 
        followers={mappedFollowers}
        onFollowUnfollow={handleFollowUnfollow}
      />
    </div>
  );
}