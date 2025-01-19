// services/Profile.ts
import axios from "axios";
import Post from "../models/posts/Post";
import PostDraft from "../models/posts/PostDraft";
import Comment from "../models/comment/Comments";

class Profile {
    private baseURL: string;

    constructor() {
        this.baseURL = import.meta.env.VITE_REST_SERVER_URL;
        console.log("API Base URL:", this.baseURL); // Debug log
    }

    async getProfile(): Promise<Post[]> {
        try {
            console.log("Fetching posts from:", `${this.baseURL}/posts`); // Debug log
            const response = await axios.get<Post[]>(`${this.baseURL}/posts`);
            console.log("API Response:", response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error("Error fetching posts:", error); // Debug log
            throw error;
        }
    }

    async addPost(post: PostDraft): Promise<Post> {
        try {
            console.log("Adding post:", post); // Debug log
            const response = await axios.post(
                `${this.baseURL}/posts`,
                post,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Add post response:", response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error("Error adding post:", error); // Debug log
            throw error;
        }
    }

    async updatePost(id: string, post: PostDraft): Promise<Post> {
        try {
            console.log("Updating post:", id, post); // Debug log
            const response = await axios.patch(
                `${this.baseURL}/posts/${id}`,
                post,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Update post response:", response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error("Error updating post:", error); // Debug log
            throw error;
        }
    }

    async removePost(id: string): Promise<void> {
        try {
            console.log("Removing post:", id); // Debug log
            await axios.delete(`${this.baseURL}/posts/${id}`);
            console.log("Post removed successfully"); // Debug log
        } catch (error) {
            console.error("Error removing post:", error); // Debug log
            throw error;
        }
    }

    async addComment(postId: string, body: string): Promise<Comment> {
        try {
            console.log("Adding comment to post:", postId, body); // Debug log
            const response = await axios.post(
                `${this.baseURL}/comments/${postId}`,
                { body },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Add comment response:", response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error("Error adding comment:", error); // Debug log
            throw error;
        }
    }
}

const profile = new Profile();
export default profile;