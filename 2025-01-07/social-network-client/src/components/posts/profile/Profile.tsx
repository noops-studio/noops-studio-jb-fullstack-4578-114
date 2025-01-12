import { useEffect, useState } from 'react';
import './Profile.css';
import PostModel from '../../../models/posts/Post';
import profile from '../../../services/Profile';
import Post from '../post/Post';
import NewPost from '../new/NewPost';

export default function Profile(): JSX.Element {
    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        profile.getProfile()
            .then((data) => {
                console.log('Fetched posts:', data); // Debugging: Log fetched data
                setPosts(data || []); // Ensure data is always an array
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
                alert('Failed to fetch posts');
            });
    }, []);

    const handleAddPost = (newPost: PostModel) => {
        try {
            setPosts([...posts,newPost]); // Prepend the new post
        } catch (error) {
            console.error('Error in InsertPost:', error);
            
        }
        
    };
    

    return (
        <div className='posts-container'>
            <NewPost onAddPost={handleAddPost} />
            {posts
                .filter((post) => post && post.id) // Filter out invalid posts
                .map((post) => (
                    <Post key={post.id} post={post} />
                ))}
        </div>
    );
}
