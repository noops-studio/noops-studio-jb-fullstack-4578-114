import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import PostModel from "../../../models/posts/Post";

interface Comment {
  id: string;
  postId: string;
  userId: string;
  body: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}

interface PostModel {
  id: string;
  userId: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  user: {
    id: string;
    name: string;
    username: string;
  };
}

interface PostsUiProps {
  post: PostModel;
  onDelete: (id: string) => Promise<boolean>;
  onAddComment: (postId: string, comment: string) => Promise<void>;
}

export default function PostsUi(props: PostsUiProps): JSX.Element {
  const { post, onDelete, onAddComment } = props;
  const { title, body, createdAt, user, id, comments } = post;
  const { name } = user;
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const isDeleted = await onDelete(id);
    if (isDeleted) {
      setIsHidden(true);
    }
    handleClose();
  };

  const handleTransitionEnd = () => {
    if (isHidden) {
      const cardElement = document.getElementById(`post-card-${id}`);
      if (cardElement) {
        cardElement.remove();
      }
    }
  };

  const handleEdit = () => {
    navigate("/edit", { state: { id } });
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await onAddComment(id, newComment);
      setNewComment("");
    }
  };

  return (
    <div
      id={`post-card-${id}`}
      className={`posts-inner-container ${isHidden ? "fade-out" : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <Card sx={{ margin: 2, padding: 2, boxShadow: 3, position: "relative" }}>
        <IconButton
          key={id}
          id="delete-button"
          aria-label="delete"
          color="error"
          onClick={handleClickOpen}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          id="edit-button"
          aria-label="edit"
          color="primary"
          onClick={handleEdit}
          sx={{ position: "absolute", top: 8, right: 48 }}
        >
          <EditIcon />
        </IconButton>

        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            <img
              src={`https://cdn.ozari.co.il/beery/noop.jpeg`}
              alt={`${name}'s profile`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            {name} at {new Date(createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body1" mt={2}>
            {body}
          </Typography>
          <Button onClick={toggleComments} sx={{ marginTop: 2 }} variant="outlined">
            {showComments ? "Hide Comments" : "Show Comments"}
          </Button>

          {showComments && (
            <div style={{ marginTop: 16 }}>
              {comments.map((comment) => (
                <div key={comment.id} style={{ marginBottom: 12 }}>
                  <Typography variant="body2" color="text.primary">
                    <strong>{comment.user.name}</strong>: {comment.body}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </div>
              ))}
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ marginTop: 2 }}
              />
              <Button
                onClick={handleAddComment}
                variant="contained"
                color="primary"
                sx={{ marginTop: 1 }}
              >
                Submit Comment
              </Button>
            </div>
          )}
        </CardContent>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
