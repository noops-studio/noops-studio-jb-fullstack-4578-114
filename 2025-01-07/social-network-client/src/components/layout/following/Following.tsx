// components/layout/following/Following.tsx
import { useEffect } from "react";
import "./Following.css";
import FollowingUi from "./FollowingUi";
import { useAppSelector } from "../../../redux/hooks";
import { useFollowing } from "../../../hooks/useFollowing";
import { useFollowers } from "../../../hooks/useFollowers";

export default function Following(): JSX.Element {
  const following = useAppSelector((state) => state.following.following).map(user => ({
    ...user,
    isFollowing: true // or any logic to determine if the user is being followed
  }));
  const { fetchFollowing } = useFollowing();
  const { unfollow } = useFollowers();

  useEffect(() => {
    fetchFollowing();
  }, []);

  const handleUnfollow = async (userId: string) => {
    try {
      await unfollow(userId);
      // The state will be automatically updated through Redux
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-lg font-semibold mb-4">Following List</h1>
      <FollowingUi
        following={following}
        onUnfollow={handleUnfollow}
      />
    </div>
  );
}