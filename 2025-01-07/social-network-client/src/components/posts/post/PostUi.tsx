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

interface PostsUiProps {
  post: PostModel;
  onDelete: (id: string) => Promise<boolean>;
  onAddComment: (postId: string, comment: string) => Promise<void>;
}

export default function PostsUi(props: PostsUiProps): JSX.Element {
  const { post, onDelete, onAddComment } = props;
  const { title, body, createdAt, id, comments = [] } = post;
  const userName = post.user?.name ?? "Anonymous";

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
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

  return (
    <Card sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
      {/* Toolbar with Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          <img
            src={`https://cdn.ozari.co.il/beery/noop.jpeg`}
            alt={`${userName}'s profile`}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "8px",
            }}
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
            onClick={() => navigate("/edit", { state: { id } })}
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
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" mt={2}>
          {body}
        </Typography>
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
            <div key={comment.id} style={{ marginBottom: 12 }}>
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
            sx={{ marginTop: 2 }}
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
