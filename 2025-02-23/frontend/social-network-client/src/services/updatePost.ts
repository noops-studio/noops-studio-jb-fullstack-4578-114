import axios from "axios";
import Post from "../models/posts/Post";
import PostDraft from "../models/posts/PostDraft";

export default async function updatePost(id: string, post: PostDraft): Promise<Post> {
// now we will make that post .title and .body will be into a json object
console.log("Post:", post);
const jsonData = JSON.stringify(post);
  const response = await axios.patch(
    `${import.meta.env.VITE_REST_SERVER_URL}/posts/${id}`,
    jsonData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Response from updatePost:", response);
  return response.data
}
