import Comment from "../comment/Comments";
import User from "../users/Users";
import PostDraft from "./PostDraft";
export default interface Post extends PostDraft {
    id: string;
    userId: string;

    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
    user: User;
}



