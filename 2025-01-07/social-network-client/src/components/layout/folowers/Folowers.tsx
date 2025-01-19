import { useEffect } from "react";
import "./Folowers.css";
import FollowersUi from "./FolowersUi";
import followerService from "../../../services/FollowersService";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { init, unfollow, follow } from "../../../redux/followersSlice";

export default function Folowers(): JSX.Element {
  const followers = useAppSelector((state) => state.followers.followers || []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersData = await followerService.getFollowers();
        console.log("Fetched followers:", followersData); // Log the fetched data
        dispatch(init(followersData));
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };
    fetchFollowers();
  }, [dispatch]);
  

  const handleFollowUnfollow = async (userId: string) => {
    try {
      // Optimistically update Redux store
      dispatch(unfollow(userId));
  
      // Make API call
      await followerService.unfollowUser(userId);
    } catch (error) {
      console.error("Failed to unfollow user:", error);
  
      // Rollback in case of failure
      dispatch(follow({ id: userId, name: "Unknown", isFollowing: true }));
    }
  };
  
  

  return (
    <div className="h-full">
      <h1 className="text-lg font-semibold mb-4">Followers List</h1>
      <FollowersUi followers={followers} onFollowUnfollow={handleFollowUnfollow} />
    </div>
  );
}
