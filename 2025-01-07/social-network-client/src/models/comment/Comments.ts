import User from "../users/Users";
import CommentDraft from "./CommentDraft";
export default interface Comment extends CommentDraft {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}
