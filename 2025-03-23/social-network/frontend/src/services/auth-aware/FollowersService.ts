import User from "../../models/users/Users";
import AuthAware from "./AuthAware";

export class FollowersService extends AuthAware {
  async getFollowers(): Promise<User[]> {
    const response = await this.axiosInstance.get<User[]>('/follows/followers');
    return response.data;
  }

  async followUser(id: string) {
    const result = await this.axiosInstance.post(`/follows/follow/${id}`);
    return result.data;
  }

  async unfollowUser(id: string): Promise<void> {
    const response = await this.axiosInstance.post(`/follows/unfollow/${id}`);
    return response.data;
  }

  async getFollowing(): Promise<User[]> {
    const response = await this.axiosInstance.get<User[]>('/follows/following');
    return response.data;
  }
}