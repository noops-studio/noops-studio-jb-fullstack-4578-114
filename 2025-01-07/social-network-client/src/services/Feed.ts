import axios from "axios";
import Post from "../models/posts/Post";

class Feed {
    async getFeed(): Promise<Post[]> {
        const response = await axios.get<Post[]>(`${import.meta.env.VITE_REST_SERVER_URL}/feed`);
        return response.data;
    }
}

const feed = new Feed();
console.log(feed);
export default feed;