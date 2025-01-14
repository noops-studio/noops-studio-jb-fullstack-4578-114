import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmUpdate = async () => {
    setIsModalOpen(false);
    await onSave({ title: postTitle, body: postBody, postId });
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Body"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Save
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="confirmation-modal"
        aria-describedby="confirmation-details"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography id="confirmation-modal" variant="h6" gutterBottom>
            Confirm Update
          </Typography>
          <Typography id="confirmation-details" gutterBottom>
            <strong>New Title:</strong> {postTitle}
          </Typography>
          <Typography gutterBottom>
            <strong>New Body:</strong> {postBody}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirmUpdate}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
