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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Post.css";
import PostModel from "../../../models/posts/Post";

interface PostsUiProps extends PostModel {
  onDelete: (id: string) => Promise<boolean>; // Assume onDelete returns a Promise<boolean>
}

export default function PostsUi(props: PostsUiProps): JSX.Element {
  const { title, body, createdAt, user, id, onDelete } = props;
  const { name } = user;
  const [open, setOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const isDeleted = await onDelete(id);
    if (isDeleted) {
      setIsHidden(true); // Trigger fade-out
    }
    handleClose();
  };

  const handleTransitionEnd = () => {
    if (isHidden) {
      const cardElement = document.getElementById(`post-card-${id}`);
      if (cardElement) {
        cardElement.remove(); // Remove the card after the fade-out ends
      }
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
        </CardContent>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this post? This action cannot be
              undone.
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
