import Comment from "../../models/comment/Comments";
import AuthAware from "./AuthAware";

export class CommentService extends AuthAware {
  async addComment(postId: string, body: string): Promise<Comment> {
    try {
      const response = await this.axiosInstance.post<Comment>(
        `/comments/${postId}`,
        { body }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  async updateComment(commentId: string, body: string): Promise<Comment> {
    try {
      const response = await this.axiosInstance.patch<Comment>(
        `/comments/${commentId}`,
        { body }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/comments/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }

  async getComments(postId: string): Promise<Comment[]> {
    try {
      const response = await this.axiosInstance.get<Comment[]>(`/comments/${postId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  }
}