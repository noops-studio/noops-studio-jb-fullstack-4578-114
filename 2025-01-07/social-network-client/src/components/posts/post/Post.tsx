import PostModel from '../../../models/posts/Post';
// import profile from '../../../services/Profile';
import './Post.css'
import PostsUi from './PostUi';
interface PostProps {
    post: PostModel;
}

export default function Post(props: PostProps): JSX.Element {
    const { post } = props;

    async function removePost(id: string): Promise<void> {
        try {
            // await profile.removePost(id);
            console.log(`Post with id ${id} has been deleted.`);
            // now we will return a promise that contains a true
            return Promise.resolve(true);
        } catch (e) {
            console.error(`Failed to delete post with id ${id}:`, e);
        }
    }


    async function handleAddComment(postId: string, comment: string): Promise<void> {
        try {
            // await profile.addComment(postId, comment);
            console.log(`Comment added to post with id ${postId}: ${comment}`);
        } catch (e) {
            console.error(`Failed to add comment to post with id ${postId}:`, e);
        }
    }

    // Pass the data and the removePost function to the PostsUi component
     return <PostsUi post={post} onDelete={removePost} onAddComment={handleAddComment} />

}
