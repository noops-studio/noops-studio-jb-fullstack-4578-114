import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, Typography, CircularProgress, Box } from "@mui/material";
import PostDraft from "../../../models/posts/PostDraft";
import InsertPost from "../../../services/InsertPost";
import PostModel from "../../../models/posts/Post"; // Import the PostModel for the callback type

interface NewPostProps {
    onAddPost: (newPost: PostModel) => void; // Prop for the callback function
}

export default function NewPost({ onAddPost }: NewPostProps): JSX.Element {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostDraft>();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState<PostDraft | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit: SubmitHandler<PostDraft> = (data) => {
        setFormData(data);
        setOpenModal(true); // Open the modal to confirm submission
    };

    const handleConfirm = async () => {
        if (formData) {
            setOpenModal(false); // Close the confirmation modal
            setLoading(true); // Show loading modal
            try {
                const newPost = await InsertPost(formData);
                console.log("New post returned from InsertPost:", newPost); // Debug: Log the new post
                if (newPost && newPost.id) {
                    onAddPost(newPost); // Pass the new post to the parent
                    setSuccessMessage("Success! Data inserted fully.");
                    reset();
                } else {
                    console.error("Invalid post returned from InsertPost:", newPost);
                }
            } catch (error) {
                console.error("Error in InsertPost:", error);
            } finally {
                setLoading(false); // Hide loading modal
            }
        }
    };

    const handleCancel = () => {
        setOpenModal(false); // Close the modal without submitting
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
                        minLength: { value: 10, message: "Title must be at least 10 characters long" },
                    })} 
                />
                <TextField 
                    label="Post Body" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    multiline 
                    rows={4} 
                    error={!!errors.body}
                    helperText={errors.body?.message}
                    {...register("body", { 
                        required: "Post body is required", 
                        minLength: { value: 10, message: "Post body must be at least 10 characters long" },
                    })} 
                />
                <Button type="submit" variant="contained" color="primary">Add Post</Button>
            </form>

            {/* Confirmation Modal */}
            <Dialog open={openModal} onClose={handleCancel}>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    <Typography><strong>Title:</strong> {formData?.title}</Typography>
                    <Typography><strong>Body:</strong> {formData?.body}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">Cancel</Button>
                    <Button onClick={handleConfirm} color="primary">Yes, Submit</Button>
                </DialogActions>
            </Dialog>

            {/* Loading Modal */}
            <Dialog open={loading}>
                <DialogContent>
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <CircularProgress />
                        <Typography>Submitting...</Typography>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Success Message */}
            {successMessage && (
                <Box mt={2}>
                    <Typography color="success.main">{successMessage}</Typography>
                </Box>
            )}
        </Container>
    );
}
