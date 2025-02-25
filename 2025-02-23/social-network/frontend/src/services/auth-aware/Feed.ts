// services/auth-aware/Feed.ts
import Post from "../../models/posts/Post";
import AuthAware from "./AuthAware";

export class FeedService extends AuthAware {
  async getFeed(): Promise<Post[]> {
    try {
      const response = await this.axiosInstance.get<Post[]>('/feed');
      return response.data;
    } catch (error) {
      console.error('Error fetching feed:', error);
      throw error;
    }
  }
}