import React, { useState } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

interface EditPostUiProps {
  title: string;
  body: string;
  postId: string;
  onSave: (updatedPost: { title: string; body: string; postId: string }) => Promise<void>;
}

export default function EditPostUi({ title, body, postId, onSave }: EditPostUiProps) {
  const [postTitle, setPostTitle] = useState(title);
  const [postBody, setPostBody] = useState(body);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmUpdate = async () => {
    setIsModalOpen(false);
    await onSave({ title: postTitle, body: postBody, postId });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Edit Post
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="edit-post-modal"
        aria-describedby="edit-post-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Edit Post
          </Typography>

          {/* Title Input */}
          <TextField
            fullWidth
            label="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            margin="normal"
            variant="outlined"
            placeholder="Enter a title for your post"
          />

          {/* Post Body Editor */}
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_KEY}
            value={postBody}
            init={{
              height: 300,
              menubar: false,
              plugins: ["lists", "link", "emoticons"],
              toolbar:
                "undo redo | bold italic | bullist numlist outdent indent | emoticons",
            }}
            onEditorChange={(content) => setPostBody(content)}
          />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirmUpdate}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
