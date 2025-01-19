import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import NewPost from '../new/NewPost';
import profileService from '../../../services/Profile';
import PostModel from '../../../models/posts/Post';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../common/Loading';
import './Profile.css';
export default function Profile() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useTitle('Profile');

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfile();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = (newPost: PostModel) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <Loading isLoading={loading} error={error} onRetry={fetchPosts} />
      <div className="posts-container flex-grow mt-6">
        <NewPost onAddPost={handleAddPost} />
        <div className="posts-container flex-grow mt-6">
          {!loading &&
            posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
}
