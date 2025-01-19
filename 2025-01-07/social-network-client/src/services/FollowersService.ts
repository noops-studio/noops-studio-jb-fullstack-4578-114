import axios from "axios";
// import userFollower from "../models/userFollower/UserFollower";
import User from "../models/users/Users";

class FollowerService {
    async getFollowers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/followers`);
        console.log(`Followers: ${response.data}`);
        return response.data;
    }

    async followUser(id:string) {
        const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/follows/follow/${id}`);
        console.log(`User with id ${id} followed`);
        return response.data;
    }

    async unfollowUser(id:string) {
        const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/follows/unfollow/${id}`);
        console.log(`User with id ${id} unfollowed`);
        return response.data;
    }


    async getFollowing(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/followers`);
        console.log(`Following: ${response.data}`);
        return response.data;
    }
}

const followerService = new FollowerService();
console.log(followerService);
export default followerService;