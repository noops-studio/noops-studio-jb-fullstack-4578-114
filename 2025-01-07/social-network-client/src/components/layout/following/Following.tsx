import { useState, useEffect } from "react";
import "./Following.css";
import FollowingUi from "./FollowingUi";
import followerService from "../../../services/FollowersService";
import User from "../../../models/users/Users";

export default function Followings(): JSX.Element {
  const [following, setFollowing] = useState<
    { id: string; name: string; isFollowing: boolean }[]
  >([]);

  const fetchFollowing = async () => {
    try {
      const followingData = await followerService.getFollowing();
      setFollowing(
        followingData.map((user) => ({
          id: user.id,
          name: user.name,
          isFollowing: true, // Since these are in the following list, they are all being followed
        }))
      );
    } catch (error) {
      alert("Failed to fetch following list.");
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <div className="Following">
      <h1>Following List</h1>
      <FollowingUi following={following} onUpdate={fetchFollowing} />
    </div>
  );
}
