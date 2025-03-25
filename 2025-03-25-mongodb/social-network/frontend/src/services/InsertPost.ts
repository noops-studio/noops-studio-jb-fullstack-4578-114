import axios from "axios";
import PostDraft from "../models/posts/PostDraft";
import PostModel from '../models/posts/Post';

export default async function InsertPost(post: PostDraft):Promise<PostModel> {
  const jsonData = JSON.stringify(post);
  const response = await axios.post(
    `${import.meta.env.VITE_REST_SERVER_URL}/posts`,
    jsonData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response.data as PostModel;
}
