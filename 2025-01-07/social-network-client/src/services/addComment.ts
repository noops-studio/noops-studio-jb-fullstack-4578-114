import axios from "axios";
import CommentDraft from "../models/comment/CommentDraft";
import Comment from "../models/comment/Comments";


export default async function InsertComment(commentData:CommentDraft):Promise<Comment> {
  const jsonData = {"body" : commentData.body};
  const response = await axios.post(
    `${import.meta.env.VITE_REST_SERVER_URL}/comments/${commentData.postId}`,
    jsonData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(`Comment added to post with id ${commentData.postId}: ${commentData.body}`);
  console.log(jsonData);
  console.log(response);
  return response.data as Comment;
}
