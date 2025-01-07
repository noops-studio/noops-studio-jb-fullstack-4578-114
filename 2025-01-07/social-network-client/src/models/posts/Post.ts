import Comment from "../comment/Comments";
import User from "../users/Users";
export default interface Post {
    id: string;
    userId: string;
    title: string;
    body: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
    user: User;
}



