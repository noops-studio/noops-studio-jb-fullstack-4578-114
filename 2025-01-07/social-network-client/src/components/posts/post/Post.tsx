

// Post.tsx
import CommentDraft from '../../../models/comment/CommentDraft';
import PostModel from '../../../models/posts/Post';
import InsertComment from '../../../services/addComment';
import './Post.css';
import PostsUi from './PostUi';

interface PostProps {
    post: PostModel;
    onDelete: (postId: string) => Promise<boolean>;
    onUpdatePost: (postId: string) => Promise<void>;
}

export default function Post(props: PostProps): JSX.Element {
    const { post, onDelete, onUpdatePost } = props;

    const handleAddComment = async (postId: string, comment: string): Promise<void> => {
        const commentData: CommentDraft = { postId, body: comment };
        try {
            const response = await InsertComment(commentData);
            console.log(`Comment added to post with id ${postId}:`, response);
            // Update the post to reflect the new comment
            await onUpdatePost(postId);
        } catch (e) {
            console.error(`Failed to add comment to post with id ${postId}:`, e);
        }
    };

    return (
        <PostsUi 
            post={post} 
            onDelete={onDelete} 
            onAddComment={handleAddComment}
        />
    );
}