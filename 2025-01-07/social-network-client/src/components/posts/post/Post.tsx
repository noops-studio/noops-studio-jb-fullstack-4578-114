import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import PostModel from "../../../models/posts/Post";
import PostsUi from "./PostUi";
import useService from "../../../hooks/useService";
import ProfileService from "../../../services/auth-aware/Profile";

interface PostProps {
  post: PostModel;
}

export default function Post({ post }: PostProps): JSX.Element {
  const dispatch = useAppDispatch();
  const profileService = useService(ProfileService); // Use the service here

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);

  const profilePictureUrl = "https://cdn.ozari.co.il/beery/noop.jpeg"; // Fixed profile picture URL

  // Handle delete
  const handleDelete = async () => {
    try {
      await profileService.removePost(post.id); // Direct service call
      dispatch({ type: "profile/deletePost", payload: post.id }); // Update Redux state
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete post:", error.message);
    }
  };

  // Handle update
  const handleUpdate = async () => {
    if (newTitle.trim() && newBody.trim()) {
      try {
        const updatedPost = await profileService.updatePost(post.id, { title: newTitle, body: newBody });
        dispatch({ type: "profile/updatePost", payload: { id: post.id, updatedPost } }); // Update Redux state
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update post:", error.message);
      }
    }
  };

  return (
    <PostsUi
      post={post}
      profilePictureUrl={profilePictureUrl}
      isEditing={isEditing}
      isDeleteDialogOpen={isDeleteDialogOpen}
      setIsEditing={setIsEditing}
      setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      newTitle={newTitle}
      newBody={newBody}
      setNewTitle={setNewTitle}
      setNewBody={setNewBody}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}
