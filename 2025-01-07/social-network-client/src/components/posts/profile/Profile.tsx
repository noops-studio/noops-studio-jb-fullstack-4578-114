// Profile.tsx
import { useEffect, useState } from 'react';
import './Profile.css';
import PostModel from '../../../models/posts/Post';
import profile from '../../../services/Profile';
import Post from '../post/Post';
import NewPost from '../new/NewPost';
import getSinglePost from '../../../services/GetSinglePost';

export default function Profile(): JSX.Element {
    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await profile.getProfile();
            console.log('Fetched posts:', data);
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('Failed to fetch posts');
        }
    };

    const handleAddPost = (newPost: PostModel) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const handleUpdatePost = async (postId: string) => {
        try {
            const postData = await getSinglePost.getSinglePost(postId);
            const updatedPost = postData[0];

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? updatedPost : post
                )
            );
        } catch (error) {
            console.error(`Error fetching updated post with id ${postId}:`, error);
        }
    };

    const handleDeletePost = async (postId: string): Promise<boolean> => {
        try {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            return false;
        }
    };

    return (
        <div className="posts-container">
            <NewPost onAddPost={handleAddPost} />
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    onUpdatePost={handleUpdatePost}
                    onDelete={handleDeletePost}
                    setPosts={setPosts} // Pass setPosts to Post component
                />
            ))}
        </div>
    );
}
