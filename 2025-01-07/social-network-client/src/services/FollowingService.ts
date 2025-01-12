import axios from "axios";
// import userFollower from "../models/userFollower/UserFollower";
import User from "../models/users/Users";

class FollowingService {
    async getFollowers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/followers`);
        return response.data;
    }
}

const followingService = new FollowingService();
console.log(followingService);
export default followingService;