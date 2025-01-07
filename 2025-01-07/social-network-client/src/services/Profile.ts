import axios from "axios";
import Post from "../models/posts/Post";

 class Profile {
    async getProfile(): Promise<Post> {
    const response = axios.get<Post>('https://jb.noop.co.il/allow/posts')
    return (await response).data
    }
}


const profile = new Profile()
export default profile;