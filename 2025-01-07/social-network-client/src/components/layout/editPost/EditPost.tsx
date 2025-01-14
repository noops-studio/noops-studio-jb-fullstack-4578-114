import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditPostUi from "../../layout/editPost/EditPostUi";
import PostModel from "../../../models/posts/Post";

interface PostsUiProps {
  post: PostModel;
  onDelete: (id: string) => Promise<boolean>;
  onSavePost: (post: { title: string; body: string }) => Promise<void>;
}

export default function PostsUi({ post, onDelete, onSavePost }: PostsUiProps) {
  const { id, title, body, createdAt } = post;

  const handleSavePost = async (updatedPost: { title: string; body: string }) => {
    await onSavePost(updatedPost);
  };

  return (
    <Card className="post-card">
      <Box className="toolbar">
        <Typography variant="subtitle1">
          {title} at {new Date(createdAt).toLocaleString()}
        </Typography>

        <Box>
          <IconButton aria-label="edit" color="primary">
            <EditPostUi
              title={title}
              body={body}
              postId={id}
              onSave={handleSavePost}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => onDelete(id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
