import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import editPostData from "../../../services/EditPost";
import EditPostUi from "./EditPostUi";
import Post from "../../../models/posts/Post";
import updatePost from "../../../services/updatePost";
import PostDraft from "../../../models/posts/PostDraft";

export default function EditPost() {
  const location = useLocation();
  const { id } = location.state || {};

  const [postData, setPostData] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const data = await editPostData.getPostToEdit(id);
        console.log("Fetched Post Data:", data); // Debugging log
        setPostData(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }

    if (id) {
      fetchPostData();
    } else {
      console.warn("No post ID provided in location state.");
    }
  }, [id]);

  const handleSave = (updatedPost: PostDraft) => {
    console.log("Updated Post:", updatedPost);
    try {
        const updateData = {title:updatedPost.title,body:updatedPost.body};
        const id = postData.id
        console.log("Updated Post:", updateData);
        console.log("Updated Post:", id);
        updatePost(id, updateData);
    } catch (error) {
      console.error("Error saving post:", error);
        
    }
  };

  if (!postData) {
    return <div>Loading...</div>;
  }
console.log(postData.id);
  return (
    <EditPostUi
        postId={postData.id}
        title={postData.title}
        body={postData.body}
        onSave={handleSave}
    />
  );
}
