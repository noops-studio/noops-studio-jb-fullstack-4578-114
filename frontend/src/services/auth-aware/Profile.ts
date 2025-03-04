// services/auth-aware/Profile.ts
import Comment from "../../models/comment/Comments";
import Post from "../../models/posts/Post";
import PostDraft from "../../models/posts/PostDraft";
import AuthAware from "./AuthAware";

export default class Profile extends AuthAware {
  private baseUrl = import.meta.env.VITE_REST_SERVER_URL_SAFE;

  async getProfile(): Promise<Post[]> {
    try {
      console.log("Fetching posts from:", `${this.baseUrl}/profile`);
      const response = await this.axiosInstance.get<Post[]>(
        `${this.baseUrl}/profile`
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  async addPost(post: FormData): Promise<Post> {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/profile`,
        post,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding post:", error);
      throw error;
    }
  }

  async updatePost(id: string, post: PostDraft): Promise<Post> {
    try {
      const response = await this.axiosInstance.patch(
        `${this.baseUrl}/profile/${id}`,
        post
      );
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async removePost(id: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`${this.baseUrl}/profile/${id}`);
    } catch (error) {
      console.error("Error removing post:", error);
      throw error;
    }
  }

  async addComment(postId: string, body: string): Promise<Comment> {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/comments/${postId}`,
        { body }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }
}
