import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteProfilePost, updateProfilePost } from "../../../redux/profileSlice";
import PostModel from "../../../models/posts/Post";
import PostsUi from "./PostUi";

interface PostProps {
  post: PostModel;
}

export default function Post({ post }: PostProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);

  const profilePictureUrl = "https://cdn.ozari.co.il/beery/noop.jpeg"; // Fixed profile picture URL

  // Handle delete
  const handleDelete = async () => {
    await dispatch(deleteProfilePost(post.id));
    setIsDeleteDialogOpen(false);
  };

  // Handle update
  const handleUpdate = async () => {
    if (newTitle.trim() && newBody.trim()) {
      await dispatch(updateProfilePost({ id: post.id, updatedPost: { title: newTitle, body: newBody } }));
      setIsEditing(false);
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
