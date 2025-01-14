import React, { useState } from "react";
import { Button } from "@mui/material";
import followerService from "../../../services/FollowersService";

interface FollowButtonProps {
  userId: string;
  isFollowing: boolean; // Whether the user is currently following
  onUpdate: () => void; // Callback to refresh the followers/following list
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isFollowing, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleFollowUnfollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await followerService.unfollowUser(userId);
      } else {
        await followerService.followUser(userId);
      }
      onUpdate(); // Refresh the followers and following list
    } catch (error) {
      alert(`Failed to ${isFollowing ? "unfollow" : "follow"} user. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color={isFollowing ? "secondary" : "primary"}
      onClick={handleFollowUnfollow}
      disabled={loading}
    >
      {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
