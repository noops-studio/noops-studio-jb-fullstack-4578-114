// components/posts/post/Post.tsx
import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import PostModel from "../../../models/posts/Post";
import PostsUi from "./PostUi";
import useService from "../../../hooks/useService";
import ProfileService from "../../../services/auth-aware/Profile";

interface PostProps {
  post: PostModel;
  onDelete: (id: string) => Promise<void>;
}

export default function Post({ post, onDelete }: PostProps): JSX.Element {
  const dispatch = useAppDispatch();
  const profileService = useService(ProfileService);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);

  const profilePictureUrl = "https://cdn.ozari.co.il/beery/noop.jpeg";

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleUpdate = async () => {
    if (newTitle.trim() && newBody.trim()) {
      try {
        const updatedPost = await profileService.updatePost(post.id, {
          title: newTitle,
          body: newBody,
        });
        dispatch({ type: "profile/updatePost", payload: updatedPost });
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update post:", error);
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