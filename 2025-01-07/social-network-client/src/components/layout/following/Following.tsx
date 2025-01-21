import { useEffect } from "react";
import "./Following.css";
import FollowingUi from "./FollowingUi";
import followerService from "../../../services/auth-aware/FollowersService";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { init, unfollow } from "../../../redux/followingSlice";

export default function Followings(): JSX.Element {
  const following = useAppSelector((state) => state.following.following);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const followingData = await followerService.getFollowing();
        dispatch(init(followingData));
      } catch (error) {
        console.error("Failed to fetch following list:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleUnfollow = async (userId: string) => {
    try {
      await followerService.unfollowUser(userId);
      dispatch(unfollow(userId)); // Update Redux store
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-lg font-semibold mb-4">Following List</h1>
      <FollowingUi
        following={following}
        onUnfollow={handleUnfollow} // Pass handler to UI
      />
    </div>
  );
}
