import axios from "axios";
import User from "../models/users/Users";

class FollowerService {
  async getFollowers(): Promise<User[]> {
    console.log("Fetching followers...");
    const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/followers`);
    return response.data;
  }

  async followUser(id: string) {
    console.log(`Following user with ID: ${id}`);
    const result = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/follows/follow/${id}`);
    console.log(result.data);
    return result.data;
  }

  async unfollowUser(id: string):Promise<void> {
    console.log(`Unfollowing user with ID: ${id}`);
    const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/follows/unfollow/${id}`);
    return response.data;
  }

  async getFollowing(): Promise<User[]> {
    console.log("Fetching following...");
    const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/following`);
    return response.data;
  }
}

const followerService = new FollowerService();
export default followerService;
