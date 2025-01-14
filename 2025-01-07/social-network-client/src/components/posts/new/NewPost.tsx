import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import PostDraft from "../../../models/posts/PostDraft";
import InsertPost from "../../../services/InsertPost";
import PostModel from "../../../models/posts/Post";

interface NewPostProps {
  onAddPost: (newPost: PostModel) => void;
}

export default function NewPost({ onAddPost }: NewPostProps): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostDraft>();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<PostDraft | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bodyContent, setBodyContent] = useState("");

  const onSubmit: SubmitHandler<PostDraft> = (data) => {
    setFormData({ ...data, body: bodyContent });
    setOpenModal(true);
  };

  const handleConfirm = async () => {
    if (formData) {
      setOpenModal(false);
      setLoading(true);
      try {
        const newPost = await InsertPost(formData);
        if (newPost && newPost.id) {
          onAddPost(newPost);
          setSuccessMessage("Success! Data inserted fully.");
          reset();
          setBodyContent(""); // Clear TinyMCE editor content
        }
      } catch (error) {
        console.error("Error in InsertPost:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title?.message}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 10,
              message: "Title must be at least 10 characters long",
            },
          })}
        />
        <Typography variant="subtitle1" gutterBottom>
          Post Body:
        </Typography>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          value={bodyContent}
          init={{
            height: 300,
            menubar: false,
            plugins: ["lists", "link", "emoticons"],
            toolbar:
              "undo redo | bold italic | bullist numlist outdent indent | emoticons",
          }}
          onEditorChange={(content) => setBodyContent(content)}
        />
        {errors.body && (
          <Typography color="error">{errors.body.message}</Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Add Post
        </Button>
      </form>

      <Dialog open={openModal} onClose={handleCancel}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Title:</strong> {formData?.title}
          </Typography>
          <Typography>
            <strong>Body:</strong>
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loading}>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <CircularProgress />
            <Typography>Submitting...</Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {successMessage && (
        <Box mt={2}>
          <Typography color="success.main">{successMessage}</Typography>
        </Box>
      )}
    </Container>
  );
}
