import axios from "axios";
import Post from "../models/posts/Post";

class Profile {
    async getProfile(): Promise<Post[]> {
        const response = await axios.get<Post[]>(`${import.meta.env.VITE_REST_SERVER_URL}/posts`);
        return response.data;
    }

    async removePost(id: string): Promise<boolean> {
        const response = await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/posts/${id}`);
        return response.data;
    }
}

const profile = new Profile();
console.log(profile);
export default profile;