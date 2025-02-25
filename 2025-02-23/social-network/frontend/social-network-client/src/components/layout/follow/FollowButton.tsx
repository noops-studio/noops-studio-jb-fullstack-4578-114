import React, { useState } from "react";
import { FollowersService } from "../../../services/auth-aware/FollowersService";
import useService from "../../../hooks/useService";

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean;
  onUpdate: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isFollowing, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const followerService = useService(FollowersService);

  const handleFollowUnfollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await followerService.unfollowUser(userId);
      } else {
        await followerService.followUser(userId);
      }
      onUpdate();
    } catch (error) {
      console.error(`Failed to ${isFollowing ? "unfollow" : "follow"} user:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowUnfollow}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
        isFollowing
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } disabled:bg-gray-300`}
    >
      {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;