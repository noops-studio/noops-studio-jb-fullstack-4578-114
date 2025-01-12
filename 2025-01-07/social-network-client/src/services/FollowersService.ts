import axios from "axios";
// import userFollower from "../models/userFollower/UserFollower";
import User from "../models/users/Users";

class FollowerService {
    async getFollowers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/allow/follows/followers`);
        return response.data;
    }
}

const followerService = new FollowerService();
console.log(followerService);
export default followerService;