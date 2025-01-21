// Feed.tsx
import React, { useEffect, useState } from 'react';
import feed from '../../../services/Feed';
import profileService from '../../../services/Profile';
import FeedPost from './FeedPost';
import Loading from '../../common/Loading';
import PostModel from '../../../models/posts/Post';

export default function Feed() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await feed.getFeed();
      // Sort posts by date (newest first)
      const sortedPosts = data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(sortedPosts);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the feed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddComment = async (postId: string, comment: string) => {
    try {
      const newComment = await profileService.addComment(postId, comment);
      // Update the posts state with the new comment
      setPosts(currentPosts => 
        currentPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...(post.comments || []), newComment].sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              )
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  };

  if (loading) {
    return <Loading isLoading={true} />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Your Feed</h1>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <FeedPost
              key={post.id}
              post={post}
              onAddComment={handleAddComment}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No posts to show. Follow some users to see their posts here!
          </div>
        )}
      </div>
    </div>
  );
}