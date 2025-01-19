import axios from "axios";
import CommentDraft from "../models/comment/CommentDraft";
import Comment from "../models/comment/Comments";


export default async function InsertComment(commentData: CommentDraft): Promise<Comment> {
  const jsonData = { body: commentData.body };
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REST_SERVER_URL}/comments/${commentData.postId}`,
      jsonData,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Comment added successfully:", response.data);
    return response.data as Comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error; // Ensure the caller knows there was a failure
  }

}
