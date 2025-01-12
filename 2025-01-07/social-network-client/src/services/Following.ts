import axios from "axios";
// import Post from "../models/posts/Post";
import User from "../models/users/Users";

class Following {
    async getFollowing(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/following`);
        return response.data;
    }
}

const following = new Following();
console.log(following);
export default following;