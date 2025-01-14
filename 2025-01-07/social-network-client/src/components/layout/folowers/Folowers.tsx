import { useState, useEffect } from "react";
import "./Folowers.css";
import Followers from "./FolowersUi";
import followerService from "../../../services/FollowersService";
import User from "../../../models/users/Users";

export default function Folowers(): JSX.Element {
  const [followers, setFollowers] = useState<
    { id: string; name: string; isFollowing: boolean }[]
  >([]);

  const fetchFollowers = async () => {
    try {
      const followersData = await followerService.getFollowers();
      const followingData = await followerService.getFollowing();

      const followingIds = new Set(followingData.map((user) => user.id));
      setFollowers(
        followersData.map((user) => ({
          id: user.id,
          name: user.name,
          isFollowing: followingIds.has(user.id),
        }))
      );
    } catch (error) {
      alert("Failed to fetch followers.");
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  return (
<div className="h-full">
  <h1 className="text-lg font-semibold mb-4">Followers List</h1>
  <Followers followers={followers} onUpdate={fetchFollowers} />
</div>
  );
}
