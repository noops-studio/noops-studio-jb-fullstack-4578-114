import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import PostModel from "../../../models/posts/Post";
import './PostsUi.css';

interface PostsUiProps {
  post: PostModel;
  onDelete: (id: string) => Promise<boolean>;
  onAddComment: (postId: string, comment: string) => Promise<void>;
  onSavePost: (post: { title: string; body: string }) => Promise<void>;
}

export default function PostsUi(props: PostsUiProps): JSX.Element {
  const { post, onDelete, onAddComment, onSavePost } = props;
  const { title, body, createdAt, id, comments = [] } = post;
  const userName = post.user?.name ?? "Anonymous";

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [newPostBody, setNewPostBody] = useState(body || "");
  const [newPostTitle, setNewPostTitle] = useState(title || "");
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();

  const handleDelete = async () => {
    const isDeleted = await onDelete(id);
    if (isDeleted) {
      setOpenDeleteDialog(false);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await onAddComment(id, newComment);
      setNewComment("");
    }
  };

  const handleSavePost = async () => {
    if (newPostTitle.trim() && newPostBody.trim()) {
      await onSavePost({ title: newPostTitle, body: newPostBody });
      setIsEditingPost(false);
    }
  };

  return (
    <Card className="post-card">
      {/* Toolbar with Icons */}
      <Box className="toolbar">
        <Typography variant="subtitle1" className="post-header">
          <img
            src={`https://cdn.ozari.co.il/beery/noop.jpeg`}
            alt={`${userName}'s profile`}
            className="profile-pic"
          />
          {userName} at {new Date(createdAt).toLocaleString()}
        </Typography>

        <Box>
          <IconButton
            aria-label="comments"
            color="primary"
            onClick={() => setOpenCommentsModal(true)}
          >
            <CommentIcon />
          </IconButton>

          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => setIsEditingPost(true)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <CardContent>
        {isEditingPost ? (
          <>
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post Title"
              className="post-title-input"
            />
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_KEY}
              value={newPostBody}
              init={{
                height: 300,
                menubar: false,
                plugins: ["lists", "link", "emoticons"],
                toolbar:
                  "undo redo | bold italic | bullist numlist outdent indent | emoticons",
              }}
              onEditorChange={(content) => setNewPostBody(content)}
            />
            <Box className="post-edit-actions">
              <Button
                onClick={handleSavePost}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditingPost(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" className="post-title" gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="body1"
              className="post-body"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </>
        )}
      </CardContent>

      {/* Comments Modal */}
      <Dialog
        open={openCommentsModal}
        onClose={() => setOpenCommentsModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {comments?.map((comment) => (
            <div key={comment.id} className="comment-item">
              <Typography variant="body2" color="text.primary">
                <strong>{comment.user?.name ?? "Anonymous"}</strong>:
                <span dangerouslySetInnerHTML={{ __html: comment.body }} />
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>
            </div>
          ))}

          {/* TinyMCE Editor */}
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_KEY}
            value={newComment}
            init={{
              height: 200,
              menubar: false,
              plugins: ["lists", "link", "emoticons"],
              toolbar:
                "undo redo | bold italic | bullist numlist outdent indent | emoticons",
            }}
            onEditorChange={(content) => setNewComment(content)}
          />

          <Button
            onClick={handleAddComment}
            variant="contained"
            color="primary"
            className="submit-comment"
          >
            Submit Comment
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogContent>
        <Button
          onClick={() => setOpenDeleteDialog(false)}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </Dialog>
    </Card>
  );
}
