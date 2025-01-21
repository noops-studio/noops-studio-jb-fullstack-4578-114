// components/posts/profile/Profile.tsx
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { useProfile } from '../../../hooks/useProfile';
import NewPost from '../new/NewPost';
import Post from '../post/Post';
import Loading from '../../common/Loading';
import useTitle from '../../../hooks/useTitle';
import './Profile.css';

export default function Profile() {
  useTitle('Profile');
  const { posts, loading, error } = useAppSelector((state) => state.profile);
  const { fetchPosts, createPost } = useProfile();

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Loading isLoading={true} />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <NewPost onAddPost={createPost} />
      <div className="posts-container flex-grow mt-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            No posts found. Create your first post above!
          </div>
        )}
      </div>
    </div>
  );
}