import axios from "axios";
import Post from "../models/posts/Post";
// import PostDraft from "../models/posts/PostDraft";

class GetSinglePost {
    async getSinglePost(id:string): Promise<Post[]> {
        const response = await axios.get<Post[]>(`${import.meta.env.VITE_REST_SERVER_URL}/posts/${id}`);
        return response.data;
    }

}

const getSinglePost = new GetSinglePost();
console.log(getSinglePost);
export default getSinglePost;