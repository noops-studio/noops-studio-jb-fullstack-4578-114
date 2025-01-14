import axios from "axios";
// import userFollower from "../models/userFollower/UserFollower";
import User from "../models/users/Users";

class FollowerService {
    async getFollowers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/followers`);
        return response.data;
    }

    async followUser(id:string) {
        const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/follows/follow/${id}`);
        return response.data;
    }

    async unfollowUser(id:string) {
        const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/follows/unfollow/${id}`);
        return response.data;
    }


    async getFollowing(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/following`);
        return response.data;
    }
}

const followerService = new FollowerService();
console.log(followerService);
export default followerService;