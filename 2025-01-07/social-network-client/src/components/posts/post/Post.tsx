

// Post.tsx
import CommentDraft from '../../../models/comment/CommentDraft';
import PostModel from '../../../models/posts/Post';
import InsertComment from '../../../services/addComment';
import updatePost from '../../../services/updatePost';
import './Post.css';
import PostsUi from './PostUi';

interface PostProps {
    post: PostModel;
    onDelete: (postId: string) => Promise<boolean>;
    onUpdatePost: (postId: string) => Promise<void>;
    setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>; // Accept setPosts as a prop
}

export default function Post(props: PostProps): JSX.Element {
    const { post, onDelete, onUpdatePost, setPosts } = props;

    const handleAddComment = async (postId: string, comment: string): Promise<void> => {
        const commentData: CommentDraft = { postId, body: comment };
        try {
            const response = await InsertComment(commentData);
            console.log(`Comment added to post with id ${postId}:`, response);

            // Update the local post state with the new comment
            setPosts((prevPosts) =>
                prevPosts.map((p) =>
                    p.id === postId
                        ? { ...p, comments: [...p.comments, response] }
                        : p
                )
            );
        } catch (e) {
            console.error(`Failed to add comment to post with id ${postId}:`, e);
        }
    };

    return (
<PostsUi
  post={post}
  onDelete={onDelete}
  onAddComment={handleAddComment}
  onSavePost={async (updatedPost) => {
    try {
      await updatePost(post.id, updatedPost); // Replace with your updatePost logic
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? { ...p, ...updatedPost } : p))
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }}
/>

    );
}
